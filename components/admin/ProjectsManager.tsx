"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Project, ProjectCategory } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

const EMPTY_FORM = {
  id: "",
  title: "",
  slug: "",
  category: "business" as ProjectCategory,
  description: "",
  duration: "",
  featured: false,
  display_order: 0,
};

// Manages the full lifecycle of a project: list, create, edit, delete,
// and uploading its thumbnail/video files to Supabase Storage.
// This is intentionally one file — everything about "managing projects"
// lives here so it's easy to find and change later.
export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) setError(error.message);
    setProjects(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function resetForm() {
    setForm(EMPTY_FORM);
    setThumbnailFile(null);
    setVideoFile(null);
  }

  function editProject(project: Project) {
    setForm({
      id: project.id,
      title: project.title,
      slug: project.slug,
      category: project.category,
      description: project.description ?? "",
      duration: project.duration ?? "",
      featured: project.featured,
      display_order: project.display_order,
    });
  }

  async function uploadFile(bucket: "thumbnails" | "videos", file: File) {
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let thumbnail_url: string | undefined;
      let video_url: string | undefined;

      if (thumbnailFile) thumbnail_url = await uploadFile("thumbnails", thumbnailFile);
      if (videoFile) video_url = await uploadFile("videos", videoFile);

      const payload = {
        title: form.title,
        slug: form.slug,
        category: form.category,
        description: form.description || null,
        duration: form.duration || null,
        featured: form.featured,
        display_order: Number(form.display_order),
        ...(thumbnail_url ? { thumbnail_url } : {}),
        ...(video_url ? { video_url } : {}),
      };

      if (form.id) {
        const { error } = await supabase.from("projects").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        if (!thumbnail_url || !video_url) {
          throw new Error("A new project needs both a thumbnail and a video file.");
        }
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }

      resetForm();
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) setError(error.message);
    await loadProjects();
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-night-blue/20 p-6">
        <h2 className="font-display text-lg font-semibold">
          {form.id ? "Edit Project" : "Add Project"}
        </h2>

        <TextField label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <TextField
          label="Slug (used in the URL, e.g. product-promo)"
          value={form.slug}
          onChange={(v) => setForm({ ...form, slug: v })}
          required
        />

        <div>
          <label className="mb-1 block text-xs text-mist">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
            className="w-full rounded-lg border border-white/10 bg-obsidian/60 px-4 py-2.5 text-sm outline-none focus:border-violet"
          >
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-mist">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-white/10 bg-obsidian/60 px-4 py-2.5 text-sm outline-none focus:border-violet"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextField label="Duration (e.g. 0:18)" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} />
          <TextField
            label="Display Order"
            value={String(form.display_order)}
            onChange={(v) => setForm({ ...form, display_order: Number(v) || 0 })}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-mist">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured (used as the homepage Showreel)
        </label>

        <div>
          <label className="mb-1 block text-xs text-mist">
            Thumbnail image {form.id && "(leave empty to keep current)"}
          </label>
          <input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] ?? null)} className="text-sm" />
        </div>

        <div>
          <label className="mb-1 block text-xs text-mist">
            Video file {form.id && "(leave empty to keep current)"}
          </label>
          <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)} className="text-sm" />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-violet px-5 py-2.5 text-sm font-medium hover:bg-violet-light disabled:opacity-60"
          >
            {saving ? "Saving…" : form.id ? "Save Changes" : "Add Project"}
          </button>
          {form.id && (
            <button type="button" onClick={resetForm} className="text-sm text-mist hover:text-white">
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="rounded-2xl border border-white/10 bg-night-blue/20 p-6">
        <h2 className="font-display text-lg font-semibold">All Projects ({projects.length})</h2>
        {loading ? (
          <p className="mt-4 text-sm text-mist">Loading…</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {projects.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-obsidian/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{project.title}</p>
                  <p className="text-xs text-mist">
                    {CATEGORY_LABELS[project.category]} · order {project.display_order}
                    {project.featured && " · featured"}
                  </p>
                </div>
                <div className="flex gap-3 text-xs">
                  <button onClick={() => editProject(project)} className="text-violet hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:underline">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-mist">{label}</label>
      <input
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-obsidian/60 px-4 py-2.5 text-sm outline-none focus:border-violet"
      />
    </div>
  );
}
