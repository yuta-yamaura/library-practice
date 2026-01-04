import type { ReturnBookRequestDto } from "src/application/dtos/loan/returnBookRequestDto";
import type { ReturnBookResponseDto } from "src/application/dtos/loan/returnBookResponseDto";

export interface ReturnBookUseCaseInterface {
    execute(requestDto: ReturnBookRequestDto): Promise<ReturnBookResponseDto>
}
