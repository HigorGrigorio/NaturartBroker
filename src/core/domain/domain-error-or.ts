import { Either } from '@core/logic';
import { DomainError } from './errors';

export type DomainErrorOr<T> = Either<DomainError, T>;

export type AsyncDomainErrorOr<T> = Promise<DomainErrorOr<T>>;
