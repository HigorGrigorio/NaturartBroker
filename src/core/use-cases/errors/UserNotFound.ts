import { UseCaseError } from './UseCaseError';

export class UserNotFound extends UseCaseError {
    constructor(message: String) {
        super(
            'SyncProductWithDatabase',
            message,
        );
    }
}
