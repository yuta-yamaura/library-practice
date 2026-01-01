import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { PasswordHasherInterface } from "src/domain/utils/passwordHasherInterface";

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

// Format: scrypt$N$r$p$saltBase64$hashBase64
const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LEN = 32;
const SALT_LEN = 16;

@Injectable()
export class ScryptPasswordHasher implements PasswordHasherInterface {
  async hash(password: string): Promise<string> {
    const salt = randomBytes(SALT_LEN);
    const derivedKey = await scrypt(password, salt, KEY_LEN, {
      N: SCRYPT_N,
      r: SCRYPT_R,
      p: SCRYPT_P,
    });

    return [
      "scrypt",
      String(SCRYPT_N),
      String(SCRYPT_R),
      String(SCRYPT_P),
      salt.toString("base64"),
      derivedKey.toString("base64"),
    ].join("$");
  }

  // Not requested, but handy for login later
  async verify(password: string, stored: string): Promise<boolean> {
    const [alg, n, r, p, saltB64, hashB64] = stored.split("$");
    if (alg !== "scrypt" || !n || !r || !p || !saltB64 || !hashB64) return false;

    const salt = Buffer.from(saltB64, "base64");
    const expected = Buffer.from(hashB64, "base64");
    const derived = await scrypt(password, salt, expected.length, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
    });

    return timingSafeEqual(expected, derived);
  }
}


