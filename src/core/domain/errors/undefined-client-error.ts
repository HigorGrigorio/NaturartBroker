import { DomainError } from '@core/domain/errors/domain-error';
import { Maybe } from '@core/logic';

export class UndefinedClientError implements DomainError {
    message: String;

    constructor(message: Maybe<String>) {
        this.message = message ?? 'Undefined client';
    }
}
