import { Controller, Get, HttpCode, HttpStatus, Inject } from "@nestjs/common";
import type { FindBookListUseCaseInterface } from "src/application/usecases/book/findBookListUseCaseInterface";
import { FIND_BOOK_LIST_USE_CASE } from "src/domain/tokens";


@Controller('booklist')
export class FindBookListController {
    constructor(
      @Inject(FIND_BOOK_LIST_USE_CASE)
      private readonly findBookUseCase: FindBookListUseCaseInterface
    ) {}

    // Home画面など「一覧を全部ほしい」用途: GET /booklist
    @Get()
    @HttpCode(HttpStatus.OK)
    async listAll() {
        return await this.findBookUseCase.execute({ ids: [] })
    }
}
