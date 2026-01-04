import { Inject, Injectable } from "@nestjs/common";
import type { IdGeneratorInterface } from "src/domain/utils/idGeneratorInterface";
import type { CreateBookUseCaseInterface } from "./createBookUseCaseInterface";
import type { BookRepositoryInterface } from "src/domain/repositories/bookRepositoryInterface";
import type { CreateBookRequestDto } from "src/application/dtos/book/createBookRequestDto";
import type { CreateBookResponseDto } from "src/application/dtos/book/createBookResponseDto";
import { Book } from "src/domain/entities/book";
import { BOOK_REPOSITORY, ID_GENERATOR } from "src/domain/tokens";


@Injectable()
export class CreateBookUseCase implements CreateBookUseCaseInterface {
    constructor(
        @Inject(ID_GENERATOR)
        private readonly idGenerator: IdGeneratorInterface,
        @Inject(BOOK_REPOSITORY)
        private readonly bookRepository: BookRepositoryInterface
    ) {}

    async execute(requestDto: CreateBookRequestDto): Promise<CreateBookResponseDto> {
        const id = this.idGenerator.generate()
        const newBook = new Book(id, requestDto.title)
        const book = await this.bookRepository.create(newBook)

        return {
            id: book.id,
            title: book.title,
            isAvailable: book.isAvailable,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt
        }
    }
}