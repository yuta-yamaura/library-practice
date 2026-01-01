import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { UserRepositoryInterface } from 'src/domain/repositories/userRepositoryInterface';
import type { PasswordHasherInterface } from 'src/domain/utils/passwordHasherInterface';
import { PASSWORD_HASHER, USER_REPOSITORY } from 'src/domain/tokens';
import { LoginUserUseCaseInterface } from './loginUserUseCaseInterface';
import type { LoginRequestDto } from 'src/application/dtos/auth/loginRequestDto';
import type { LoginResponseDto } from 'src/application/dtos/auth/loginResponseDto';


@Injectable()
export class LoginUserUseCase implements LoginUserUseCaseInterface {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepositoryInterface,
        @Inject(PASSWORD_HASHER)
        private readonly passwordHasher: PasswordHasherInterface
    ) {}

    async execute(requestDto: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.userRepository.findByEmail(requestDto.email);
        if (!user) {
            // avoid leaking whether email exists
            throw new UnauthorizedException('Invalid credentials');
        }

        const ok = await this.passwordHasher.verify(requestDto.password, user.password);
        if (!ok) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return { id: user.id, email: user.email };
    }
}
