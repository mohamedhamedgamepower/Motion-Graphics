import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/types";

interface ProjectPageProps {
  params: { slug: string };
}

// Pre-render a page for every project at build time — good for SEO and speed.
// New projects added later are still served (Next.js renders them on demand).
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description ?? `${project.title} — a motion graphics project.`,
    openGraph: {
      title: project.title,
      description: project.description ?? undefined,
      images: [project.thumbnail_url],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <main className="bg-obsidian">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 pb-24 pt-32 lg:px-10">
        <Link href="/#work" className="text-sm text-mist hover:text-white">
          &larr; Back to work
        </Link>

        <p className="eyebrow mt-6">{CATEGORY_LABELS[project.category]}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">{project.title}</h1>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black">
          <video
            src={project.video_url}
            poster={project.thumbnail_url}
            controls
            playsInline
            className="aspect-video w-full bg-black"
          />
        </div>

        {project.description && (
          <p className="mt-6 max-w-2xl text-mist">{project.description}</p>
        )}
      </section>

      <Footer />
    </main>
  );
}
