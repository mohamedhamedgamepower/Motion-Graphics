"use client";

import { useState } from "react";
import type { Package } from "@/lib/types";

interface ProjectRequestFormProps {
  selectedPackage: Package | null;
  onClose: () => void;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

// A simple modal form. It posts to /api/project-request, which is the
// only place that talks to Supabase for this form — see that route file
// if you need to change what happens with a submitted request.
export default function ProjectRequestForm({
  selectedPackage,
  onClose,
}: ProjectRequestFormProps) {
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      package_name: selectedPackage?.name ?? formData.get("package_name"),
      videos_needed: formData.get("videos_needed"),
      message: formData.get("message"),
      reference_link: formData.get("reference_link"),
    };

    try {
      const res = await fetch("/api/project-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("success");
    } catch (err) {
      console.error(err);
      setState("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-night-blue/40 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow">Project Request</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">Send a Project Request</h3>
          </div>
          <button onClick={onClose} aria-label="Close form" className="text-2xl leading-none">
            &times;
          </button>
        </div>

        {state === "success" ? (
          <div className="mt-8 text-center">
            <p className="font-display text-xl">Thanks — request received!</p>
            <p className="mt-2 text-sm text-mist">
              I&apos;ll get back to you by email shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-violet px-6 py-2.5 text-sm font-medium"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>

            <Field label="Company / Brand" name="company" />

            {selectedPackage ? (
              <div>
                <p className="mb-1 text-xs text-mist">Selected Package</p>
                <p className="rounded-lg border border-white/10 bg-obsidian/60 px-4 py-2.5 text-sm">
                  {selectedPackage.name} — {selectedPackage.videos_count} Videos (${selectedPackage.price})
                </p>
              </div>
            ) : (
              <Field label="Package" name="package_name" />
            )}

            <Field label="Number of Videos" name="videos_needed" />
            <Field label="Reference Link (optional)" name="reference_link" />

            <div>
              <label className="mb-1 block text-xs text-mist" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-lg border border-white/10 bg-obsidian/60 px-4 py-2.5 text-sm text-white outline-none focus:border-violet"
              />
            </div>

            {state === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again or email me directly.
              </p>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className="w-full rounded-full bg-violet px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-light disabled:opacity-60"
            >
              {state === "submitting" ? "Sending…" : "Send Project Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-mist" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-obsidian/60 px-4 py-2.5 text-sm text-white outline-none focus:border-violet"
      />
    </div>
  );
}
