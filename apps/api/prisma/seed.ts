import { prisma } from '../lib/prisma';

async function main() {
  // Re-seed deterministically (avoid duplicates)
  await prisma.book.deleteMany();

  await prisma.book.createMany({
    data: [
      { title: 'Clean Architecture 入門', isAvailable: true },
      { title: 'TypeScript 実践ガイド', isAvailable: true },
      { title: 'NestJS ハンズオン', isAvailable: false },
      { title: 'Prisma + PostgreSQL', isAvailable: true },
      { title: 'Web API 設計の基本', isAvailable: true },
      { title: 'テスト駆動開発 (TDD)', isAvailable: false },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });


