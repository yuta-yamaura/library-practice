"use client";

import { useEffect, useMemo, useState } from "react";

type Book = {
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

export function BookList() {
  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);
  const [books, setBooks] = useState<Book[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setError(null);
      try {
        const res = await fetch(`${apiBaseUrl}/books`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
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

        if (!cancelled) setBooks(json as Book[]);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Unknown error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
        {error}
      </div>
    );
  }

  if (!books) {
    return (
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        Loading books...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Books</h2>
        <span className="text-xs text-zinc-600 dark:text-zinc-400">
          {books.length} items
        </span>
      </div>

      <ul className="divide-y divide-black/10 overflow-hidden rounded-xl border border-black/10 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-zinc-950">
        {books.map((b) => (
          <li key={b.id} className="flex items-center justify-between px-4 py-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{b.title}</div>
              <div className="mt-1 truncate text-xs text-zinc-600 dark:text-zinc-400">
                id: <span className="font-mono">{b.id}</span>
              </div>
            </div>
            <span
              className={[
                "ml-4 inline-flex shrink-0 items-center rounded-full px-2 py-1 text-xs font-medium",
                b.isAvailable
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-200"
                  : "bg-zinc-500/10 text-zinc-700 dark:text-zinc-200",
              ].join(" ")}
            >
              {b.isAvailable ? "Available" : "Unavailable"}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        API: <span className="font-mono">{apiBaseUrl}</span>
      </p>
    </div>
  );
}


