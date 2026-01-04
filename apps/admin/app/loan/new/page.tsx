import Link from "next/link";
import { LoanBookForm } from "./loanBookForm";

export default async function LoanNewPage({
  searchParams,
}: {
  searchParams: Promise<{ bookId?: string }>;
}) {
  const { bookId } = await searchParams;

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-md space-y-4">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">Loan book</h1>
            <Link href="/" className="text-sm font-medium hover:underline">
              Back
            </Link>
          </div>

          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            書籍IDとユーザーIDを指定して貸出を作成します。
          </p>

          <div className="mt-6">
            <LoanBookForm defaultBookId={bookId ?? ""} />
          </div>
        </div>
      </main>
    </div>
  );
}


