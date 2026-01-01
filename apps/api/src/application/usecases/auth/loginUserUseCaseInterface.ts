import { LoginRequestDto } from "src/application/dtos/auth/loginRequestDto";
import { LoginResponseDto } from "src/application/dtos/auth/loginResponseDto";

export interface LoginUserUseCaseInterface {
    execute(requestDto: LoginRequestDto): Promise<LoginResponseDto>
}
