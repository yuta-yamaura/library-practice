import { prisma } from '../lib/prisma';

async function main() {
  // Order matters if relations are added later. Start with children tables.
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();
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


