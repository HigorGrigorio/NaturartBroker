import { Product } from '@domain/entities/product';
import { Product as RawProduct } from '@infra/api/product';
import { ProductTypeMap } from './product-type-map';

export class ProductMap {
    public static toDomain(rawProduct: RawProduct): Product {
        const productResult = Product.create(
            {
                serialCode: rawProduct.serialCode,
            },
            rawProduct.id,
        );

        if (productResult.isFailure()) {
            throw new Error(productResult.value.message.toString());
        }

        const { value: product } = productResult;

        rawProduct.types.forEach((rawType) => {
            const type = ProductTypeMap.toDomain(rawType);
            const idItem = rawType.sensorTypeItem.id;

            product.addType(type, idItem);
        });
        return product;
    }
}
