import { Inject, Injectable } from "@nestjs/common";
import type { ReturnBookRequestDto } from "src/application/dtos/loan/returnBookRequestDto";
import type { ReturnBookResponseDto } from "src/application/dtos/loan/returnBookResponseDto";
import type { ReturnBookUseCaseInterface } from "./returnBookUseCaseInterface";
import type { LoanRepositoryInterface } from "src/domain/repositories/loanRepositoryInterface";
import { LOAN_REPOSITORY } from "src/domain/tokens";

@Injectable()
export class ReturnBookUseCase implements ReturnBookUseCaseInterface {
    constructor(
        @Inject(LOAN_REPOSITORY)
        private readonly loanRepository: LoanRepositoryInterface,
    ) {}

    async execute(requestDto: ReturnBookRequestDto): Promise<ReturnBookResponseDto> {
        const loan = await this.loanRepository.returnByLoanId(requestDto.id)

        if (!loan.returnDate) {
            // Repository should always set returnDate, but keep it safe
            throw new Error('返却日時の更新に失敗しました')
        }

        return {
            id: loan.id,
            returnDate: loan.returnDate,
            createdAt: loan.createdAt,
            updatedAt: loan.updatedAt,
        }
    }
}