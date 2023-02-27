import { Product } from '@domain/entities/product';
import { HttpClient } from '@infra/helpers/http-client';
import { describe, it, expect } from '@jest/globals';
import { DomainError } from '@core/domain/errors';
import { HttpProductRepository } from './http-product-repository';

type SutTypes = {
    sut: HttpProductRepository;
};

const makeSut = (): SutTypes => {
    return { sut: new HttpProductRepository(HttpClient.default()) };
};

describe('AxiosProductRepository', () => {
    describe('getBySerialCode', () => {
        it('should be able to load a product by serial code', async () => {
            const { sut } = makeSut();
            const productResult = await sut.loadBySerialCode('12345');

            console.log(productResult);

            expect(productResult.isFailure()).toBeFalsy();

            const product = productResult.value as Product;

            expect(product.serialCode).toBe('12345');
        });

        it('should be able to retrieve a error when the serial code is invalid', async () => {
            const { sut } = makeSut();
            const productResult = await sut.loadBySerialCode('');

            expect(productResult.isFailure()).toBeTruthy();

            const product = productResult.value as DomainError;

            expect(product.message).toBe(
                'The attribute serialCode cannot has been empty.',
            );
        });
    });
});
