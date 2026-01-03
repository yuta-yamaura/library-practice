import { FindBookDetailRequestDto } from "src/application/dtos/book/findBookDetailRequestDto";
import { FindBookResponseDto } from "src/application/dtos/book/findBookResponseDto";

export interface FindBookDetailUseCaseInterface {
    execute(requestDto: FindBookDetailRequestDto): Promise<FindBookResponseDto>
}
