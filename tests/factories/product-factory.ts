import { failure, Maybe } from '@core/logic';
import { Override } from '@core/logic/Override';
import { Product, ProductProps } from '@domain/entities/product';
import { faker } from '@faker-js/faker';

export function makeProduct(
    override: Override<ProductProps> = {},
    id: Maybe<Number> = null,
): Product {
    const productResult = Product.create(
        {
            serialCode: faker.random.alpha(15),
            ...override
        },
        id,
    );

    if (productResult.isFailure()) {
        throw new Error(productResult.value.message.toString());
    }

    return productResult.value;
}
