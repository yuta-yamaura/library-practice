import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupController } from 'src/adapter/controllers/signup.controller';
import { PrismaUserRepository } from 'src/adapter/repositories/prismaUserRepository';
import { UuidGenerator } from 'src/adapter/utils/uuidGenerator';
import { ScryptPasswordHasher } from 'src/adapter/utils/scryptPasswordHasher';
import { CreateUserUseCase } from 'src/application/usecases/user/createUserUseCase';
import { CREATE_BOOK, ID_GENERATOR, PASSWORD_HASHER, USER_REPOSITORY } from 'src/domain/tokens';
import { LoginController } from './adapter/controllers/login.controller';
import { LoginUserUseCase } from 'src/application/usecases/auth/loginUserUseCase';
import { FindBookListController } from './adapter/controllers/bookList.controller';
import { BOOK_REPOSITORY } from 'src/domain/tokens';
import { PrismaBookRepository } from 'src/adapter/repositories/prismaBookRepository';
import { FindBookListUseCase } from 'src/application/usecases/book/findBookListUseCase';
import { FIND_BOOK_DETAIL_USE_CASE, FIND_BOOK_LIST_USE_CASE } from 'src/domain/tokens';
import { FindBookDetailUseCase } from 'src/application/usecases/book/findBookDetailUseCase';
import { CreateBookUseCase } from './application/usecases/book/createBookUseCase';

@Module({
  imports: [],
  controllers: [AppController, SignupController, LoginController, FindBookListController],
  providers: [
    AppService,
    // Bind domain interfaces (tokens) to adapter implementations
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    { provide: ID_GENERATOR, useClass: UuidGenerator },
    { provide: PASSWORD_HASHER, useClass: ScryptPasswordHasher },
    { provide: BOOK_REPOSITORY, useClass: PrismaBookRepository },
    { provide: FIND_BOOK_LIST_USE_CASE, useClass: FindBookListUseCase },
    { provide: FIND_BOOK_DETAIL_USE_CASE, useClass: FindBookDetailUseCase },
    { provide: CREATE_BOOK, useClass: CreateBookUseCase },
    // UseCase is injectable; its constructor injects the tokens above.
    CreateUserUseCase,
    LoginUserUseCase,
  ],
})
export class AppModule {}
