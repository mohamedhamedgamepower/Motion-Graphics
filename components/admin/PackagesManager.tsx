"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Package } from "@/lib/types";

const EMPTY_FORM = {
  id: "",
  name: "",
  videos_count: 5,
  price: 0,
  currency: "USD",
  description: "",
  features: "", // one feature per line in the textarea
  popular: false,
  display_order: 0,
  active: true,
};

// Manages packages the same way ProjectsManager handles projects:
// one list, one form, simple create/edit/delete.
export default function PackagesManager() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadPackages() {
    setLoading(true);
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) setError(error.message);
    setPackages(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadPackages();
  }, []);

  function resetForm() {
    setForm(EMPTY_FORM);
  }

  function editPackage(pkg: Package) {
    setForm({
      id: pkg.id,
      name: pkg.name,
      videos_count: pkg.videos_count,
      price: pkg.price,
      currency: pkg.currency,
      description: pkg.description ?? "",
      features: pkg.features.join("\n"),
      popular: pkg.popular,
      display_order: pkg.display_order,
      active: pkg.active,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name,
      videos_count: Number(form.videos_count),
      price: Number(form.price),
      currency: form.currency,
      description: form.description || null,
      features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
      popular: form.popular,
      display_order: Number(form.display_order),
      active: form.active,
    };

    const query = form.id
      ? supabase.from("packages").update(payload).eq("id", form.id)
      : supabase.from("packages").insert(payload);

    const { error } = await query;
    if (error) setError(error.message);
    else {
      resetForm();
      await loadPackages();
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this package?")) return;
    const { error } = await supabase.from("packages").delete().eq("id", id);
    if (error) setError(error.message);
    await loadPackages();
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-night-blue/20 p-6">
        <h2 className="font-display text-lg font-semibold">
          {form.id ? "Edit Package" : "Add Package"}
        </h2>

        <TextField label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />

        <div className="grid grid-cols-2 gap-4">
          <NumberField label="Videos Count" value={form.videos_count} onChange={(v) => setForm({ ...form, videos_count: v })} />
          <NumberField label="Price" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
        </div>

        <TextField label="Currency" value={form.currency} onChange={(v) => setForm({ ...form, currency: v })} />

        <div>
          <label className="mb-1 block text-xs text-mist">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="w-full rounded-lg border border-white/10 bg-obsidian/60 px-4 py-2.5 text-sm outline-none focus:border-violet"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-mist">Features (one per line)</label>
          <textarea
            value={form.features}
            onChange={(e) => setForm({ ...form, features: e.target.value })}
            rows={5}
            className="w-full rounded-lg border border-white/10 bg-obsidian/60 px-4 py-2.5 text-sm outline-none focus:border-violet"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <NumberField label="Display Order" value={form.display_order} onChange={(v) => setForm({ ...form, display_order: v })} />
          <div className="flex flex-col justify-end gap-2 pb-1">
            <label className="flex items-center gap-2 text-sm text-mist">
              <input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} />
              Most Popular
            </label>
            <label className="flex items-center gap-2 text-sm text-mist">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
              Active (visible on site)
            </label>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-violet px-5 py-2.5 text-sm font-medium hover:bg-violet-light disabled:opacity-60"
          >
            {saving ? "Saving…" : form.id ? "Save Changes" : "Add Package"}
          </button>
          {form.id && (
            <button type="button" onClick={resetForm} className="text-sm text-mist hover:text-white">
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className="rounded-2xl border border-white/10 bg-night-blue/20 p-6">
        <h2 className="font-display text-lg font-semibold">All Packages ({packages.length})</h2>
        {loading ? (
          <p className="mt-4 text-sm text-mist">Loading…</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {packages.map((pkg) => (
              <li
                key={pkg.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-obsidian/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    {pkg.name} — ${pkg.price} {pkg.currency}
                  </p>
                  <p className="text-xs text-mist">
                    {pkg.videos_count} videos · order {pkg.display_order}
                    {pkg.popular && " · popular"}
                    {!pkg.active && " · inactive"}
                  </p>
                </div>
                <div className="flex gap-3 text-xs">
                  <button onClick={() => editPackage(pkg)} className="text-violet hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(pkg.id)} className="text-red-400 hover:underline">
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

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-mist">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-white/10 bg-obsidian/60 px-4 py-2.5 text-sm outline-none focus:border-violet"
      />
    </div>
  );
}
