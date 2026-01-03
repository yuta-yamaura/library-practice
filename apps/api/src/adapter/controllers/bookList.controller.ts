import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import type { CreateBookRequestDto } from "src/application/dtos/book/createBookRequestDto";
import type { CreateBookUseCaseInterface } from "src/application/usecases/book/createBookUseCaseInterface";
import type { FindBookDetailUseCaseInterface } from "src/application/usecases/book/findBookDetailUseCaseInterface";
import type { FindBookListUseCaseInterface } from "src/application/usecases/book/findBookListUseCaseInterface";
import { CREATE_BOOK, FIND_BOOK_DETAIL_USE_CASE, FIND_BOOK_LIST_USE_CASE } from "src/domain/tokens";


@Controller('books')
export class FindBookListController {
    constructor(
      @Inject(FIND_BOOK_LIST_USE_CASE)
      private readonly findBookListUseCase: FindBookListUseCaseInterface,
      @Inject(FIND_BOOK_DETAIL_USE_CASE)
      private readonly findBookDetailUseCase: FindBookDetailUseCaseInterface,
      @Inject(CREATE_BOOK)
      private readonly createBookUseCase: CreateBookUseCaseInterface
    ) {}

    // Home画面など「一覧を全部ほしい」用途: GET /books
    @Get()
    @HttpCode(HttpStatus.OK)
    async listAll() {
        return await this.findBookListUseCase.execute({ ids: [] })
    }

    // 書籍詳細: GET /books/:id
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async detail(@Param('id') id: string) {
      return await this.findBookDetailUseCase.execute({ id })
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createBook(@Body() body: CreateBookRequestDto) {
      return await this.createBookUseCase.execute(body)
    }
}
