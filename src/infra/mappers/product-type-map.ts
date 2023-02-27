import { ProductType } from '@domain/entities/product-type';
import { ProductType as ProductTypeRaw } from '@infra/api/product-type';

export class ProductTypeMap {
    public static toDomain(raw: ProductTypeRaw): ProductType {
        const productTypeResult = ProductType.create(
            {
                name: raw.name,
            },
            raw.id,
        );

        if (productTypeResult.isFailure()) {
            throw new Error(productTypeResult.value.message.toString());
        }

        return productTypeResult.value;
    }
}
