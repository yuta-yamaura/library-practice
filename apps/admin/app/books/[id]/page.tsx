import Link from "next/link";

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

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString();
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apiBaseUrl = getApiBaseUrl();

  const res = await fetch(`${apiBaseUrl}/books/${encodeURIComponent(id)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  const text = await res.text();
  const json = text ? (JSON.parse(text) as ApiErrorBody) : null;

  if (!res.ok) {
    const message =
      (typeof json === "object" && json ? json.message ?? json.error : null) ??
      `Request failed (${res.status})`;
    const errorText = Array.isArray(message) ? message.join(", ") : String(message);

    return (
      <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black dark:text-zinc-50">
        <main className="mx-auto w-full max-w-md space-y-4">
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold tracking-tight">Book detail</h1>
              <Link href="/" className="text-sm font-medium hover:underline">
                Back
              </Link>
            </div>

            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
              {errorText}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const book = json as Book;

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-md space-y-4">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">Book detail</h1>
            <Link href="/" className="text-sm font-medium hover:underline">
              Back
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">Title</div>
              <div className="mt-1 text-sm font-medium">{book.title}</div>
            </div>

            <div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">ID</div>
              <div className="mt-1 break-all font-mono text-xs">{book.id}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                Availability
              </div>
              <span
                className={[
                  "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                  book.isAvailable
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-200"
                    : "bg-zinc-500/10 text-zinc-700 dark:text-zinc-200",
                ].join(" ")}
              >
                {book.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            <div className="pt-1">
              <Link
                href={`/loan/new?bookId=${encodeURIComponent(book.id)}`}
                aria-disabled={!book.isAvailable}
                className={[
                  "inline-flex h-10 w-full items-center justify-center rounded-lg px-4 text-sm font-medium",
                  book.isAvailable
                    ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
                    : "cursor-not-allowed bg-zinc-900/30 text-white/70 dark:bg-zinc-50/30 dark:text-zinc-950/60",
                ].join(" ")}
              >
                Loan this book
              </Link>
              {!book.isAvailable ? (
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  ※ Unavailable のため貸出は推奨しません。
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  Created
                </div>
                <div className="mt-1 text-sm">{formatDate(book.createdAt)}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  Updated
                </div>
                <div className="mt-1 text-sm">{formatDate(book.updatedAt)}</div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-zinc-600 dark:text-zinc-400">
            API: <span className="font-mono">{apiBaseUrl}</span>
          </p>
        </div>
      </main>
    </div>
  );
}


