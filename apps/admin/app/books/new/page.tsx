import Link from "next/link";
import { CreateBookForm } from "./createBookForm";

export default function CreateBookPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-md space-y-4">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">Create book</h1>
            <Link href="/" className="text-sm font-medium hover:underline">
              Back
            </Link>
          </div>

          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            書籍タイトルを入力して登録します。
          </p>

          <div className="mt-6">
            <CreateBookForm />
          </div>
        </div>
      </main>
    </div>
  );
}


