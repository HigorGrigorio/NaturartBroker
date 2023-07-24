import { IProductRepository } from '@application/repositories/product-repository';
import {
    AsyncDomainErrorOr,
} from '@core/domain/domain-error-or';
import { failure, success } from '@core/logic';
import { Product } from '@domain/entities/product';

export class InMemoryProductRepository implements IProductRepository {
    private products: Array<Product> = [];

    public async create(product: Product): Promise<Boolean> {
        this.products.push(product);
        return true;
    }

    public async loadBySerialCode(
        serialCode: String,
    ): AsyncDomainErrorOr<Product> {
        const product = this.products.find(
            (item) => item.serialCode === serialCode,
        );

        if (!product) {
            return failure({
                message: 'Product not found',
            });
        }

        return success(product);
    }
}
