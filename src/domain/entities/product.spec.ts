import { describe, it, expect } from '@jest/globals';
import { Product } from './product';
import { faker } from '@faker-js/faker';
import { makeProduct } from '@tests/factories/product-factory';
import { makeProductType } from '@tests/factories/product-type-factory';

describe('Product', () => {
    describe('create', () => {
        it('should be able create a new product', () => {
            const sut = Product.create(
                {
                    serialCode: faker.random.alpha(10),
                },
                null,
            );

            expect(sut.value).toBeInstanceOf(Product);
        });
    });

    describe('addType', () => {
        it('should be able relate the product to the many products', () => {
            const sut = makeProduct();
            const type = makeProductType();

            sut.addType(type, null);

            expect(sut.types.length).toBe(1);
        });

        it('should be able relate the product to the product type only once', () => {
            const sut = makeProduct();
            const type = makeProductType();

            sut.addType(type, null);
            sut.addType(type, null);

            expect(sut.types.length).toBe(1);
        });
    });

    describe('removeType', () => {
        it('should be possible to remove the ralated products from the type', () => {
            const sut = makeProduct();
            const type = makeProductType();

            sut.addType(type, null);
            expect(sut.types.length).toBe(1);

            sut.removeType(type);
            expect(sut.types.length).toBe(0);
        });
    });
});
