import { UseCaseError } from './UseCaseError';

export class ProductNotFound extends UseCaseError {
    constructor() {
        super(
            'SyncProductWithDatabase',
            'Product not found',
        );
    }
}
