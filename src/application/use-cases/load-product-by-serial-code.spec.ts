import { IProductRepository } from '@application/repositories/product-repository';
import { Product } from '@domain/entities/product';
import { describe, it, expect, beforeAll } from '@jest/globals';
import { makeProduct } from '@tests/factories/product-factory';
import { InMemoryProductRepository } from '@tests/repositories/in-memory-product-repository';
import { LoadProductBySerialCode } from './load-product-by-serial-code';

type SutTypes = {
    sut: LoadProductBySerialCode;
    productRepository: IProductRepository;
};

const makeSut = (productRepository: InMemoryProductRepository): SutTypes => {
    return {
        sut: new LoadProductBySerialCode(productRepository),
        productRepository,
    } as SutTypes;
};

describe('LoadClientBySerialCode', () => {
    let productRepository: InMemoryProductRepository;

    beforeAll(() => {
        productRepository = new InMemoryProductRepository();

        productRepository.create(makeProduct());
        productRepository.create(makeProduct());
        productRepository.create(makeProduct());
        productRepository.create(makeProduct({ serialCode: '1234567890' }));
    });

    it('should be able to laod a product by serial code', async () => {
        const { sut } = makeSut(productRepository);
        const result = await sut.execute({ serialCode: '1234567890' });

        expect(result.isFailure()).toBeFalsy();
        expect((result.value as Product).serialCode).toBe('1234567890');
    });
});
