import type { LoanBookRequestDto } from "src/application/dtos/loan/loanBookRequestDto";
import type { LoanBookResponseDto } from "src/application/dtos/loan/loanBookResponseDto";
import type { LoanBookUseCaseInterface } from "./loanBookUseCaseInterface";
import type { LoanRepositoryInterface } from "src/domain/repositories/loanRepositoryInterface";
import { Loan } from "src/domain/entities/loan";
import type { IdGeneratorInterface } from "src/domain/utils/idGeneratorInterface";
import { Inject, Injectable } from "@nestjs/common";
import { ID_GENERATOR, LOAN_REPOSITORY } from "src/domain/tokens";


@Injectable()
export class LoanBookUseCase implements LoanBookUseCaseInterface {
    constructor(
        @Inject(LOAN_REPOSITORY)
        private readonly loanRepository: LoanRepositoryInterface,
        @Inject(ID_GENERATOR)
        private readonly idGenerator: IdGeneratorInterface
    ) {}
    async execute(requestDto: LoanBookRequestDto): Promise<LoanBookResponseDto> {
        const newLoan = new Loan(
            this.idGenerator.generate(),
            requestDto.bookId,
            requestDto.userId,
            new Date()
        )
        const loanBook = await this.loanRepository.create(newLoan)

        return {
            id: loanBook.id,
            bookId: loanBook.bookId,
            userId: loanBook.userId,
            loanDate: loanBook.loanDate,
            createdAt: loanBook.createdAt,
            updatedAt: loanBook.updatedAt,
        }
    }
}