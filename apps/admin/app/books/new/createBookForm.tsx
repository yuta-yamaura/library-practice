"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type CreateBookResult = {
  id: string;
  title: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiErrorBody =
  | { message?: string | string[]; error?: string }
  | string
  | null;

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
}

export function CreateBookForm() {
  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateBookResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!title.trim()) return setError("Title is required.");

    setIsSubmitting(true);
    try {
      const res = await fetch(`${apiBaseUrl}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const text = await res.text();
      const json = text ? (JSON.parse(text) as ApiErrorBody) : null;

      if (!res.ok) {
        const message =
          (typeof json === "object" && json
            ? json.message ?? json.error
            : null) ?? `Request failed (${res.status})`;
        throw new Error(
          Array.isArray(message) ? message.join(", ") : String(message),
        );
      }

      const data = json as CreateBookResult;
      setResult(data);
      setTitle("");
      router.push(`/books/${encodeURIComponent(data.id)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 outline-none focus:ring-2 focus:ring-zinc-900/20 dark:border-white/10 dark:bg-zinc-950 dark:focus:ring-zinc-100/20"
          placeholder="e.g. Clean Architecture"
        />
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-800 dark:text-emerald-200">
          Created: <span className="font-medium">{result.title}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
      >
        {isSubmitting ? "Creating..." : "Create book"}
      </button>

      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        API: <span className="font-mono">{apiBaseUrl}</span>
      </p>
    </form>
  );
}


