# Nova Motion — Motion Graphics Portfolio Website

A premium, dark, database-driven portfolio website for a motion graphics
studio. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and
**Supabase** (database, storage, and login for the admin area).

This README is written for someone with limited programming experience —
follow it step by step and you'll have the site running locally, connected
to your own Supabase project, and deployed online.

---

## 1. What's in this project

```text
motion-portfolio/
│
├── app/                      Pages (Next.js "App Router")
│   ├── page.tsx              Homepage
│   ├── layout.tsx            Shared HTML shell, fonts, page metadata
│   ├── globals.css           Global styles (colors, fonts, small effects)
│   ├── not-found.tsx         404 page
│   ├── work/[slug]/page.tsx  One page per project, e.g. /work/product-promo
│   ├── admin/                Admin login + dashboard (protected)
│   └── api/project-request/  Saves the contact/request form to Supabase
│
├── components/
│   ├── layout/                Navbar, MobileMenu, Footer
│   ├── home/                  Hero, Showreel, About, Contact
│   ├── projects/               CategoryFilter, ProjectGrid, ProjectCard, ProjectsSection
│   ├── packages/               Packages, PackageCard, ProjectRequestForm
│   ├── admin/                  AdminGuard, ProjectsManager, PackagesManager
│   └── shared/                 VideoModal (used by both Showreel and projects)
│
├── lib/
│   ├── types.ts                Shared TypeScript types (mirrors the database)
│   ├── data.ts                 All the read queries the public site uses
│   └── supabase/
│       ├── client.ts           Supabase client for the browser
│       └── server.ts           Supabase client for the server
│
├── supabase/
│   ├── schema.sql               Creates the database tables + security rules
│   └── seed.sql                 Fills the site with 20 sample projects + packages
│
├── .env.local.example           Template for your Supabase keys
└── package.json
```

**Rule of thumb for finding things:** each visual section of the homepage
has its own file in `components/`. Want to change the pricing cards? Open
`components/packages/PackageCard.tsx`. Want to change the hero headline?
Open `components/home/Hero.tsx`.

---

## 2. Install and run locally

You'll need [Node.js](https://nodejs.org) (version 18 or newer) installed.

1. Open a terminal in this project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variable template:
   ```bash
   cp .env.local.example .env.local
   ```
4. Follow **Section 3** below to fill in `.env.local` with your Supabase keys.
5. Start the site:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

Until you connect Supabase, the site will run but show empty sections
("No projects in this category yet…", etc.) — that's expected.

---

## 3. Create your Supabase project

[Supabase](https://supabase.com) is the free/low-cost backend that stores
your projects, packages, and file uploads.

1. Go to [supabase.com](https://supabase.com) and sign up or log in.
2. Click **New Project**. Pick any name (e.g. "nova-motion") and a strong
   database password (save it somewhere safe).
3. Wait a minute or two for the project to finish setting up.

### Where to find your URL and key

1. In your Supabase project, go to **Project Settings** (gear icon) → **API**.
2. Copy the **Project URL** → paste it into `.env.local` as
   `NEXT_PUBLIC_SUPABASE_URL`.
3. Copy the **anon / public** key → paste it into `.env.local` as
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Your `.env.local` should now look like:

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

⚠️ **Never** use the "service_role" key anywhere in this project — only the
"anon / public" key. The service_role key can bypass all security rules
and must never be exposed in a website.

Restart `npm run dev` after editing `.env.local`.

---

## 4. Create the database tables

1. In Supabase, open **SQL Editor** (left sidebar) → **New query**.
2. Open the file `supabase/schema.sql` from this project, copy all of it,
   and paste it into the SQL Editor.
3. Click **Run**. This creates the `projects`, `packages`, and
   `project_requests` tables, plus the security rules that keep your data
   safe (see Section 9).
4. Repeat the same steps with `supabase/seed.sql` to add 20 sample
   projects and 4 sample packages, so the site isn't empty.

The sample projects use placeholder thumbnails and stand-in sample videos
— replace them with your real work using the Admin Dashboard (Section 6).

---

## 5. Create the Storage buckets

`schema.sql` already creates the three Storage buckets (`videos`,
`thumbnails`, `assets`) and their access rules for you — you don't need to
create them by hand. To confirm they exist:

1. In Supabase, open **Storage** in the left sidebar.
2. You should see `videos`, `thumbnails`, and `assets` listed.

If for some reason they're missing, you can create them manually:
**Storage → New bucket** → name it exactly `videos` (repeat for
`thumbnails` and `assets`) → toggle **Public bucket** ON for each.

---

## 6. Set up the Admin Dashboard (to manage content yourself)

The Admin Dashboard at `/admin` lets you add, edit, and delete projects and
packages, including uploading thumbnails and videos, without touching any
code.

### Create your admin login

1. In Supabase, go to **Authentication → Users**.
2. Click **Add user** → **Create new user**.
3. Enter your email and a password. Leave "Auto Confirm User" checked.
4. Click **Create user**.

### Log in

1. Go to `http://localhost:3000/admin` (or `yoursite.com/admin` once deployed).
2. Sign in with the email/password you just created.
3. You'll land on the Dashboard with two tabs: **Projects** and **Packages**.

### How to add a project

1. In the dashboard, go to the **Projects** tab.
2. Fill in the title, a URL-friendly slug (e.g. `summer-campaign`), pick a
   category, add a description, duration (like `0:20`), and a display order
   (lower numbers show first).
3. Check **Featured** if you want this project's video to be the homepage
   Showreel.
4. Choose a thumbnail image file and a video file from your computer.
5. Click **Add Project**. The files upload to Supabase Storage and the
   project appears on the site immediately — no code changes needed.

### How to edit a project

Click **Edit** next to any project in the list, change any field (you can
leave the thumbnail/video fields empty to keep the existing files), then
click **Save Changes**.

### How to delete a project

Click **Delete** next to a project and confirm. It disappears from the
site immediately.

### How to edit package prices

1. Go to the **Packages** tab.
2. Click **Edit** on the package you want to change (e.g. "Business").
3. Update the **Price** field (e.g. `55` → `65`) and click **Save Changes**.
   The homepage pricing section updates automatically — no code changes,
   no redeploy needed.

### Managing categories

Categories are intentionally kept as a fixed list (Business, Product,
Social Media, Promotional, Real Estate, Food & Restaurants) so the filter
bar and the database always agree. To add a new category, an AI assistant
or developer can help you: add the new value to the `category` check in
`supabase/schema.sql`, add it to `ProjectCategory` and `CATEGORY_LABELS` in
`lib/types.ts`, and add it to the `CATEGORIES` list in
`components/projects/CategoryFilter.tsx`.

---

## 7. How the request form works

When a visitor picks a package and submits the "Send Project Request"
form, it's saved into the `project_requests` table in Supabase. To view
submissions:

1. In Supabase, go to **Table Editor → project_requests**.
2. You'll see every submission with the visitor's name, email, chosen
   package, and message.

(A future improvement, if you want it later, is wiring this up to send you
an email notification — see Section 11.)

---

## 8. Editing content and design

- **Homepage text** (headlines, hero copy, about text): edit the relevant
  component in `components/home/`.
- **Colors**: all three brand colors live in `tailwind.config.ts` under
  `theme.extend.colors` (`obsidian`, `night-blue`, `violet`). Change a hex
  value there and it updates everywhere on the site.
- **Fonts**: set in `app/layout.tsx`.
- **Projects and packages**: managed through the Admin Dashboard or
  directly in Supabase's Table Editor — never hard-coded in the code.

---

## 9. Security notes

- The website only ever uses the **anon / public** Supabase key. It is
  safe to see in the browser because of **Row Level Security (RLS)**
  policies set up in `schema.sql`:
  - Anyone can **read** projects and packages.
  - Only a **signed-in** user (you, the admin) can **add/edit/delete**
    projects and packages, or upload/delete files in Storage.
  - Anyone can **submit** a project request, but only a signed-in user can
    **read** submissions.
- Never commit your `.env.local` file or share your service_role key. Only
  the two `NEXT_PUBLIC_...` values are meant to be used by this project.
- The `/admin` pages check that you're logged in before showing any
  controls — but the real protection is the RLS rules above, which apply
  no matter what a browser tries to do.

---

## 10. Deploying the website

### Deploying to Vercel (recommended, made by the creators of Next.js)

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), sign in, and click **Add New →
   Project**.
3. Import your GitHub repository.
4. In the **Environment Variables** step, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (same values as your `.env.local`)
5. Click **Deploy**. Vercel builds and hosts the site, and gives you a
   live URL.
6. Any time you push a change to GitHub, Vercel automatically redeploys.

### Deploying to Netlify

1. Push this project to GitHub.
2. In Netlify, click **Add new site → Import an existing project**.
3. Choose the repository. Netlify auto-detects Next.js.
4. Under **Site settings → Environment variables**, add the same two
   `NEXT_PUBLIC_...` variables as above.
5. Click **Deploy site**.

Either way, remember: content changes (new projects, price changes) never
need a redeploy — only code changes do.

---

## 11. Growing the site later

The site is built so it can grow without a rebuild:

- **More projects**: add as many as you like from the Admin Dashboard —
  the grid, filters, and individual `/work/...` pages all scale
  automatically.
- **More packages**: same idea — add, edit, deactivate (`active = false`)
  or remove packages any time.
- **New sections** (Testimonials, Blog, Case Studies, etc.): add a new
  folder under `components/`, a new table in Supabase if it needs its own
  data, and a new query in `lib/data.ts`. This mirrors exactly how
  Projects and Packages were built, so an AI assistant can follow the same
  pattern.
- **Email notifications on new project requests**: can be added later
  using a Supabase Database Webhook or Edge Function that calls an email
  service — this doesn't require changing the form itself.
- **WhatsApp contact / payment integration**: can be added as extra
  buttons/links in `components/home/Contact.tsx` and
  `components/packages/PackageCard.tsx` without touching anything else.

---

## 12. Troubleshooting

- **Sections are empty ("No projects yet")** → check `.env.local` has the
  right Supabase URL/key, and that you ran both `schema.sql` and
  `seed.sql` in the SQL Editor.
- **Images/videos don't load** → confirm the Storage buckets are marked
  **Public**, and that the file URLs in the `projects` table start with
  `https://<your-project-ref>.supabase.co/storage/...`.
- **Can't log into `/admin`** → double check you created the user under
  **Authentication → Users** in Supabase (not just a database row), and
  that "Auto Confirm User" was checked.
- **Environment variables not working** → make sure the file is named
  exactly `.env.local` (not `.env.local.example`) and restart
  `npm run dev` after editing it.

---

Built to stay simple: three brand colors, one component per section, one
SQL file per concern, and no content hard-coded into the code. Happy
shipping.
