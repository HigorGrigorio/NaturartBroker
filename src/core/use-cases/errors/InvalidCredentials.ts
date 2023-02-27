import { UseCaseError } from './UseCaseError';

export class InvalidCredentials extends UseCaseError {
    constructor() {
        super(
            'SyncProductWithDatabase',
            'Invalid credentials',
        );
    }
}
