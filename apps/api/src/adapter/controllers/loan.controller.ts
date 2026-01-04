import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import type { LoanBookRequestDto } from "src/application/dtos/loan/loanBookRequestDto";
import type { LoanBookUseCaseInterface } from "src/application/usecases/loan/loanBookUseCaseInterface";
import { LOAN_BOOK } from "src/domain/tokens";


@Controller('loan')
export class LoanController {
    constructor(
        @Inject(LOAN_BOOK)
        private readonly loanBookUseCase: LoanBookUseCaseInterface
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async loanBook(@Body() body: LoanBookRequestDto) {
        return await this.loanBookUseCase.execute(body)
    }
}
