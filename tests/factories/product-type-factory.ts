import { Maybe } from '@core/logic';
import { Override } from '@core/logic/Override';
import { ProductProps, Product } from '@domain/entities/product';
import { ProductType, ProductTypeProps } from '@domain/entities/product-type';
import { faker } from '@faker-js/faker';

export function makeProductType(
    override: Override<ProductTypeProps> = {},
    id: Maybe<Number> = null,
): ProductType {
    const productTypeResult = ProductType.create(
        {
            name: faker.helpers.arrayElement(['Temperature', 'PH', 'Humidity']),
            ...override,
        },
        id,
    );

    if (productTypeResult.isFailure()) {
        throw new Error(productTypeResult.value.message.toString());
    }

    return productTypeResult.value;
}
