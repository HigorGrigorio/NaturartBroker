import { UseCaseError } from './UseCaseError';

export class UndefinedProducts extends UseCaseError {
    constructor() {
        super(
            'SyncProductWithDatabase',
            'The user not have products in the database',
        );
    }
}
