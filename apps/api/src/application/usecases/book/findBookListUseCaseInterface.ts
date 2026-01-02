import { FindBookRequestDto } from "src/application/dtos/book/findBookRequestDto";
import { FindBookResponseDto } from "src/application/dtos/book/findBookResponseDto";

export interface FindBookListUseCaseInterface {
    execute(requestDto: FindBookRequestDto): Promise<FindBookResponseDto[]>
}
