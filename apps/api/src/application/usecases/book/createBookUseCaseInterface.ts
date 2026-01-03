import type { CreateBookRequestDto } from "src/application/dtos/book/createBookRequestDto";
import type { CreateBookResponseDto } from "src/application/dtos/book/createBookResponseDto";

export interface CreateBookUseCaseInterface {
  execute(requestDto: CreateBookRequestDto): Promise<CreateBookResponseDto>;
}




