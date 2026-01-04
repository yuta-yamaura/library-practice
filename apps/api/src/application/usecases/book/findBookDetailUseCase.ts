import { Inject, Injectable } from "@nestjs/common";
import type { BookRepositoryInterface } from "src/domain/repositories/bookRepositoryInterface";
import { BOOK_REPOSITORY } from "src/domain/tokens";
import { FindBookResponseDto } from "src/application/dtos/book/findBookResponseDto";
import { FindBookDetailRequestDto } from "src/application/dtos/book/findBookDetailRequestDto";
import { FindBookDetailUseCaseInterface } from "./findBookDetailUseCaseInterface";


@Injectable()
export class FindBookDetailUseCase implements FindBookDetailUseCaseInterface {
    constructor(
        @Inject(BOOK_REPOSITORY)
        private readonly bookRepository: BookRepositoryInterface
    ) {}

    async execute(requestDto: FindBookDetailRequestDto): Promise<FindBookResponseDto> {
        const book = await this.bookRepository.findBookDetail(requestDto.id)
        return {
            id: book.id,
            title: book.title,
            isAvailable: book.isAvailable,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt
        }
    }
}