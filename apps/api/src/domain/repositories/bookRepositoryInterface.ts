import { Book } from "../entities/book";


export interface bookRepositoryInterface {
    findBookList(ids: string[]): Promise<Book[]>;
}
