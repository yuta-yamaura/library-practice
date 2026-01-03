import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from 'lib/prisma';
import { Book } from 'src/domain/entities/book';
import type { bookRepositoryInterface } from 'src/domain/repositories/bookRepositoryInterface';

@Injectable()
export class PrismaBookRepository implements bookRepositoryInterface {
  async findBookList(ids: string[]): Promise<Book[]> {
    const books = await prisma.book.findMany({
      ...(ids.length > 0 ? { where: { id: { in: ids } } } : {}),
      orderBy: { createdAt: 'desc' },
    });

    return books.map(
      (b) => new Book(b.id, b.title, b.isAvailable, b.createdAt, b.updatedAt),
    );
  }

  async findBookDetail(id: string): Promise<Book> {
    const book = await prisma.book.findUnique({
      where: {id},
      select: {id: true, title: true, isAvailable: true, createdAt: true, updatedAt: true}
    })

    if (!book) {
      throw new NotFoundException('選択した書籍が見つかりませんでした')
    }

    return new Book(
      book.id,
      book.title,
      book.isAvailable,
      book.createdAt,
      book.updatedAt
    )
  }
}


