import { LoanBookRequestDto } from "src/application/dtos/loan/loanBookRequestDto";
import { LoanBookResponseDto } from "src/application/dtos/loan/loanBookResponseDto";
import { LoanBookUseCaseInterface } from "./loanBookUseCaseInterface";
import type { LoanRepositoryInterface } from "src/domain/repositories/loanRepositoryInterface";
import { Loan } from "src/domain/entities/loan";
import type { IdGeneratorInterface } from "src/domain/utils/idGeneratorInterface";
import { Inject } from "@nestjs/common";
import { ID_GENERATOR, LOAN_REPOSITORY } from "src/domain/tokens";


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

        return loanBook
    }
}