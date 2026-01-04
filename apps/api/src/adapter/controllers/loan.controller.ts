import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import type { LoanBookRequestDto } from "src/application/dtos/loan/loanBookRequestDto";
import type { ReturnBookRequestDto } from "src/application/dtos/loan/returnBookRequestDto";
import type { LoanBookUseCaseInterface } from "src/application/usecases/loan/loanBookUseCaseInterface";
import type { ReturnBookUseCaseInterface } from "src/application/usecases/loan/returnBookUseCaseInterface";
import { LOAN_BOOK, RETURN_BOOK } from "src/domain/tokens";


@Controller('loan')
export class LoanController {
    constructor(
        @Inject(LOAN_BOOK)
        private readonly loanBookUseCase: LoanBookUseCaseInterface,
        @Inject(RETURN_BOOK)
        private readonly returnBookUseCase: ReturnBookUseCaseInterface,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async loanBook(@Body() body: LoanBookRequestDto) {
        return await this.loanBookUseCase.execute(body)
    }

    @Post('return')
    @HttpCode(HttpStatus.OK)
    async returnBook(@Body() body: ReturnBookRequestDto) {
        return await this.returnBookUseCase.execute(body)
    }
}
