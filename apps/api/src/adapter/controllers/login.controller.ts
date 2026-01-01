import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginUserUseCase } from 'src/application/usecases/auth/loginUserUseCase';

@Controller('login')
export class LoginController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }) {
    return await this.loginUserUseCase.execute({
      email: body.email,
      password: body.password,
    });
  }
}


