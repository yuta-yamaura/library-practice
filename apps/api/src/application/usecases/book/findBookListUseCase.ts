import { Inject, Injectable } from "@nestjs/common";
import type { FindBookListUseCaseInterface } from "./findBookListUseCaseInterface";
import type { BookRepositoryInterface } from "src/domain/repositories/bookRepositoryInterface";
import { BOOK_REPOSITORY } from "src/domain/tokens";
import type { FindBookRequestDto } from "src/application/dtos/book/findBookRequestDto";
import type { FindBookResponseDto } from "src/application/dtos/book/findBookResponseDto";


@Injectable()
export class FindBookListUseCase implements FindBookListUseCaseInterface {
    constructor(
        @Inject(BOOK_REPOSITORY)
        private readonly bookRepository: BookRepositoryInterface
    ) {}

    async execute(requestDto: FindBookRequestDto): Promise<FindBookResponseDto[]> {
        const books = await this.bookRepository.findBookList(requestDto.ids)
        return books.map((book) => ({
            id: book.id,
            title: book.title,
            isAvailable: book.isAvailable,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt
        }))
    }
}