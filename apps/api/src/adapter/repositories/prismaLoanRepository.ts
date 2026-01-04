import { prisma } from "lib/prisma";
import { Loan } from "src/domain/entities/loan";
import { LoanRepositoryInterface } from "src/domain/repositories/loanRepositoryInterface";


export class PrismaLoanRepository implements LoanRepositoryInterface {
    async create(loan: Loan): Promise<Loan> {
        const newLoan = await prisma.loan.create({
            data: {
                id: loan.id,
                bookId: loan.bookId,
                userId: loan.userId,
                loanDate: loan.loanDate,
                createdAt: loan.createdAt,
                updatedAt: loan.updatedAt
            }
        })

        return new Loan(
            newLoan.id,
            newLoan.bookId,
            newLoan.userId,
            newLoan.loanDate,
            newLoan.createdAt,
            newLoan.updatedAt
        )
    }
}