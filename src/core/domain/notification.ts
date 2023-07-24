import { DomainError } from './errors';

interface NotificationError {
    context: String;
    domainError: DomainError;
}

export class Notification implements DomainError {
    constructor(private _errors: NotificationError[] = []) {
    }

    get message() {
        return this._errors
            .map((error) => `${error.context}:${error.domainError.message}`)
            .join(',');
    }

    get errors(): NotificationError[] {
        return this._errors;
    }

    addError(error: NotificationError): Notification {
        this._errors.push(error);
        return this;
    }
}
