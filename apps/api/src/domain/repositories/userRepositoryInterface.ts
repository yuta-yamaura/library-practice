import { User } from '../entities/user';
import { CreateUserRecord } from './userRepositoryTypes';

export interface UserRepositoryInterface {
  create(user: CreateUserRecord): Promise<User>;
  findByEmail(email: string): Promise<{ id: string; email: string; password: string } | null>;
}
