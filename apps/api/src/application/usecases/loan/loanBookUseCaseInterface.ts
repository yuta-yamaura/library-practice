import { LoanBookRequestDto } from "src/application/dtos/loan/loanBookRequestDto";
import { LoanBookResponseDto } from "src/application/dtos/loan/loanBookResponseDto";


export interface LoanBookUseCaseInterface {
    execute(requestDto: LoanBookRequestDto): Promise<LoanBookResponseDto>
}
