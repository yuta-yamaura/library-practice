import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupController } from 'src/adapter/controllers/signup.controller';
import { PrismaUserRepository } from 'src/adapter/repositories/prismaUserRepository';
import { UuidGenerator } from 'src/adapter/utils/uuidGenerator';
import { ScryptPasswordHasher } from 'src/adapter/utils/scryptPasswordHasher';
import { CreateUserUseCase } from 'src/application/usecases/user/createUserUseCase';
import { ID_GENERATOR, PASSWORD_HASHER, USER_REPOSITORY } from 'src/domain/tokens';
import { LoginController } from './adapter/controllers/login.controller';
import { LoginUserUseCase } from 'src/application/usecases/auth/loginUserUseCase';

@Module({
  imports: [],
  controllers: [AppController, SignupController, LoginController],
  providers: [
    AppService,
    // Bind domain interfaces (tokens) to adapter implementations
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    { provide: ID_GENERATOR, useClass: UuidGenerator },
    { provide: PASSWORD_HASHER, useClass: ScryptPasswordHasher },
    // UseCase is injectable; its constructor injects the tokens above.
    CreateUserUseCase,
    LoginUserUseCase,
  ],
})
export class AppModule {}
