import { User } from '../entities/user';
import { CreateUserRecord } from './userRepositoryTypes';

export interface UserRepositoryInterface {
  create(user: CreateUserRecord): Promise<User>;
}
