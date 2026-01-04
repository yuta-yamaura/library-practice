import { Book } from "../entities/book";


export interface BookRepositoryInterface {
    create(book: Book): Promise<Book>;
    findBookList(ids: string[]): Promise<Book[]>;
    findBookDetail(id: string): Promise<Book>;
}
