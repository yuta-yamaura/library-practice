import Link from "next/link";
import { BookList } from "./books/bookList";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <h1 className="text-2xl font-semibold tracking-tight">Home</h1>

          <div className="mt-6">
            <BookList />
          </div>

          <div className="mt-6 flex gap-4 text-sm font-medium">
            <Link
              href="/login"
              className="text-zinc-950 hover:underline dark:text-zinc-50"
            >
              Go to login
            </Link>
            <Link
              href="/signup"
              className="text-zinc-950 hover:underline dark:text-zinc-50"
            >
              Go to signup
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
