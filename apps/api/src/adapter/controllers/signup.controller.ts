import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/usecases/user/createUserUseCase';

@Controller('signup')
export class SignupController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: { email: string; password: string }) {
    return await this.createUserUseCase.execute({
      email: body.email,
      password: body.password,
    });
  }
}


