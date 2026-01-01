import { type InjectionToken } from '@nestjs/common';

export const USER_REPOSITORY: InjectionToken = Symbol('USER_REPOSITORY');
export const ID_GENERATOR: InjectionToken = Symbol('ID_GENERATOR');
export const PASSWORD_HASHER: InjectionToken = Symbol('PASSWORD_HASHER');


