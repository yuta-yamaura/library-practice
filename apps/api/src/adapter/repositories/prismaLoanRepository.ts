import { NotFoundException } from "@nestjs/common";
import { prisma } from "lib/prisma";
import { Loan } from "src/domain/entities/loan";
import { LoanRepositoryInterface } from "src/domain/repositories/loanRepositoryInterface";


export class PrismaLoanRepository implements LoanRepositoryInterface {
    async create(loan: Loan): Promise<Loan> {
        const newLoan = await prisma.$transaction(async (tx) => {
            const book = await tx.book.findUnique({
                where: {id: loan.bookId},
                select: {id: true, isAvailable: true}
            })
            if(!book?.id) {
                throw new NotFoundException('書籍が見つかりませんでした')
            }
            if(!book.isAvailable) {
                throw new Error('書籍は既に貸出中です')
            }

            await tx.book.update({
                where: {id: loan.bookId},
                data: {isAvailable: false}
            })
            return await tx.loan.create({
                data: {
                    id: loan.id,
                    bookId: loan.bookId,
                    userId: loan.userId,
                    loanDate: loan.loanDate,
                    createdAt: loan.createdAt,
                    updatedAt: loan.updatedAt
                }
            })
        })
        

        return new Loan(
            newLoan.id,
            newLoan.bookId,
            newLoan.userId,
            newLoan.loanDate,
            newLoan.returnDate ?? null,
            newLoan.createdAt,
            newLoan.updatedAt,
        )
    }
}