import { CreateUserRequestDto } from "src/application/dtos/user/createUserRequestDto";
import { CreateUserResponseDto } from "src/application/dtos/user/createUserResponseDto";

export interface CreateUserUseCaseInterface {
    execute(requestDto: CreateUserRequestDto): Promise<CreateUserResponseDto>
}
