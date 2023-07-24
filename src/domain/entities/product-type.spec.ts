import { describe, expect, it } from '@jest/globals';
import { makeProduct } from '@tests/factories/product-factory';
import { makeProductType } from '@tests/factories/product-type-factory';
import { ProductType } from './product-type';

describe('ProductType', () => {
    describe('create', () => {
        it('should be able to create a new product type', () => {
            const productResult = ProductType.create(
                {
                    name: 'Temperature',
                },
                null,
            );

            expect(productResult.value).toBeInstanceOf(ProductType);
        });
    });

    describe('addProduct', () => {
        it('should be possible to relate the type to the many products', () => {
            const product = makeProduct();
            const sut = makeProductType();

            sut.addProduct(product, null);

            expect(sut.products.length).toBe(1);
        });

        it('should be possible to realte the type with the product only once', () => {
            const product = makeProduct();
            const sut = makeProductType();

            sut.addProduct(product, null);
            sut.addProduct(product, null);

            expect(sut.products.length).toBe(1);
        });
    });

    describe('removeProduct', () => {
        it('should be possible to remove related products of the list', () => {
            const product = makeProduct();
            const product1 = makeProduct();
            const sut = makeProductType();

            sut.addProduct(product, null);
            sut.addProduct(product1, null);
            expect(sut.products.length).toBe(2);

            sut.removeProduct(product);
            expect(sut.products.length).toBe(1);
            expect(sut.products.at(0)).toEqual(product1);
        });
    });
});
