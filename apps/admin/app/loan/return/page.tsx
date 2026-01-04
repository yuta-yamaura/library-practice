import Link from "next/link";
import { ReturnBookForm } from "./returnBookForm";

export default async function ReturnLoanPage({
  searchParams,
}: {
  searchParams: Promise<{ loanId?: string }>;
}) {
  const { loanId } = await searchParams;

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-md space-y-4">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">Return book</h1>
            <Link href="/" className="text-sm font-medium hover:underline">
              Back
            </Link>
          </div>

          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            loanId を指定して返却します（`POST /loan/return`）。
          </p>

          <div className="mt-6">
            <ReturnBookForm defaultLoanId={loanId ?? ""} />
          </div>
        </div>
      </main>
    </div>
  );
}


