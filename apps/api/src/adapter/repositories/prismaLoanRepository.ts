import { NotFoundException } from "@nestjs/common";
import { prisma } from "lib/prisma";
import { Loan } from "src/domain/entities/loan";
import type { LoanRepositoryInterface } from "src/domain/repositories/loanRepositoryInterface";


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
                    returnDate: loan.returnDate ?? undefined,
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

    async findByLoanId(id: string): Promise<Loan> {
        const record = await prisma.loan.findUnique({
            where: { id },
        })

        if (!record) {
            throw new NotFoundException('貸出が見つかりませんでした')
        }

        return new Loan(
            record.id,
            record.bookId,
            record.userId,
            record.loanDate,
            record.returnDate ?? null,
            record.createdAt,
            record.updatedAt,
        )
    }

    async returnByLoanId(id: string): Promise<Loan> {
        const record = await prisma.$transaction(async (tx) => {
            const loan = await tx.loan.findUnique({
                where: { id },
                select: {
                    id: true,
                    bookId: true,
                    userId: true,
                    loanDate: true,
                    returnDate: true,
                    createdAt: true,
                    updatedAt: true,
                },
            })

            if (!loan) {
                throw new NotFoundException('貸出が見つかりませんでした')
            }
            if (loan.returnDate) {
                throw new Error('この貸出は既に返却済みです')
            }

            const returnedAt = new Date()
            const updatedLoan = await tx.loan.update({
                where: { id: loan.id },
                data: { returnDate: returnedAt },
                select: {
                    id: true,
                    bookId: true,
                    userId: true,
                    loanDate: true,
                    returnDate: true,
                    createdAt: true,
                    updatedAt: true,
                },
            })

            await tx.book.update({
                where: { id: updatedLoan.bookId },
                data: { isAvailable: true },
            })

            return updatedLoan
        })

        return new Loan(
            record.id,
            record.bookId,
            record.userId,
            record.loanDate,
            record.returnDate ?? null,
            record.createdAt,
            record.updatedAt,
        )
    }
}