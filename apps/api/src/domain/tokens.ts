import { type InjectionToken } from '@nestjs/common';

export const USER_REPOSITORY: InjectionToken = Symbol('USER_REPOSITORY');
export const ID_GENERATOR: InjectionToken = Symbol('ID_GENERATOR');
export const PASSWORD_HASHER: InjectionToken = Symbol('PASSWORD_HASHER');
export const BOOK_REPOSITORY: InjectionToken = Symbol('BOOK_REPOSITORY');
export const FIND_BOOK_LIST_USE_CASE: InjectionToken = Symbol('FIND_BOOK_LIST_USE_CASE');
export const FIND_BOOK_DETAIL_USE_CASE: InjectionToken = Symbol(
  'FIND_BOOK_DETAIL_USE_CASE',
);


