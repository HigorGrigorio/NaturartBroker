import { Either } from '../logic/Either';
import { UseCaseError } from './errors';

export type ErrorOr<T> = Either<UseCaseError, T>;

export type AsyncErrorOr<T> = Promise<ErrorOr<T>>;
