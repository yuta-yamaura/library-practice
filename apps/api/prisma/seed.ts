import { prisma } from '../lib/prisma';
import { randomBytes, scrypt as scryptCb } from 'node:crypto';

type ScryptOptions = {
  N: number;
  r: number;
  p: number;
};

function scrypt(
  password: string,
  salt: Buffer,
  keyLength: number,
  options: ScryptOptions,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCb(password, salt, keyLength, options, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey as Buffer);
    });
  });
}

// Keep consistent with `ScryptPasswordHasher`:
// Format: scrypt$N$r$p$saltBase64$hashBase64
const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LEN = 32;
const SALT_LEN = 16;

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LEN);
  const derivedKey = await scrypt(password, salt, KEY_LEN, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });

  return [
    'scrypt',
    String(SCRYPT_N),
    String(SCRYPT_R),
    String(SCRYPT_P),
    salt.toString('base64'),
    derivedKey.toString('base64'),
  ].join('$');
}

async function main() {
  // Re-seed deterministically (avoid duplicates)
  await prisma.loan.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      { email: 'admin@example.com', password: await hashPassword('password123') },
      { email: 'user1@example.com', password: await hashPassword('password123') },
      { email: 'user2@example.com', password: await hashPassword('password123') },
    ],
  });

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


