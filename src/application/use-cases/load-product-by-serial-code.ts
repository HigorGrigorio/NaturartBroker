import { IProductRepository } from '@application/repositories/product-repository';
import { failure } from '@core/logic';
import { AsyncErrorOr, Service } from '@core/use-cases';
import { Product } from '@domain/entities/product';

interface LoadProductBySerialCodeRequest {
    serialCode: String;
}

export class LoadProductBySerialCode extends Service<
    LoadProductBySerialCodeRequest,
    Product
> {
    public constructor(private productRepository: IProductRepository) {
        super();
    }

    async execute(
        request: LoadProductBySerialCodeRequest,
    ): AsyncErrorOr<Product> {
        const result = await this.productRepository.loadBySerialCode(
            request.serialCode,
        );

        if (result.isFailure()) {
            return failure({
                name: 'LoadProductBySerialCode',
                message: result.value.message,
            });
        }

        return result;
    }
}
