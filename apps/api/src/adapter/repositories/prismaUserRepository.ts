import { Injectable } from '@nestjs/common';
import { prisma } from "lib/prisma";
import { User } from "src/domain/entities/user";
import { UserRepositoryInterface } from "src/domain/repositories/userRepositoryInterface";
import { CreateUserRecord } from "src/domain/repositories/userRepositoryTypes";

@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {
  async create(user: CreateUserRecord): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
      },
    });

    return new User(
      createdUser.id,
      createdUser.email,
      createdUser.createdAt,
      createdUser.updatedAt,
    );
  }

  async findByEmail(
    email: string,
  ): Promise<{ id: string; email: string; password: string } | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });
    return user;
  }
}


