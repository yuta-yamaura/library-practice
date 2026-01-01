import { Inject, Injectable } from '@nestjs/common';
import type { UserRepositoryInterface } from "src/domain/repositories/userRepositoryInterface";
import { CreateUserUseCaseInterface } from "./createUserUseCaseInterface";
import { CreateUserRequestDto } from "src/application/dtos/user/createUserRequestDto";
import { CreateUserResponseDto } from "src/application/dtos/user/createUserResponseDto";
import type { IdGeneratorInterface } from "src/domain/utils/idGeneratorInterface";
import type { PasswordHasherInterface } from "src/domain/utils/passwordHasherInterface";
import { ID_GENERATOR, PASSWORD_HASHER, USER_REPOSITORY } from "src/domain/tokens";


@Injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepositoryInterface,
        @Inject(ID_GENERATOR)
        private readonly idGenerator: IdGeneratorInterface, // ユーザーのidを生成
        @Inject(PASSWORD_HASHER)
        private readonly passwordHasher: PasswordHasherInterface
    ) {}

    async execute(requestDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
        const id = this.idGenerator.generate()
        const hashedPassword = await this.passwordHasher.hash(requestDto.password)
        const createdUser = await this.userRepository.create({
            id,
            email: requestDto.email,
            password: hashedPassword
        })

        return {
            id: createdUser.id,
            email: createdUser.email,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        }
    }
}
