import { describe, it, expect } from '@jest/globals';
import { HttpClientRepository } from '@infra/repositories/http-client-repository';
import { HttpClient } from '@infra/helpers/http-client';
import { DomainErrorOr } from '@core/domain/domain-error-or';
import { DomainError } from '@core/domain/errors/domain-error';
import { Product } from '@domain/entities/product';

type SutTypes = {
    sut: HttpClientRepository;
};

const makeSut = (): SutTypes => {
    return {
        sut: new HttpClientRepository(HttpClient.default()),
    };
};

describe('HttpClientRepository', () => {
    describe('getByEmail', () => {
        it('should be able to load a client from the registry', async () => {
            const { sut } = makeSut();
            const clientResult = await sut.loadByEmail(
                'erickzikabta@gmail.com',
            );

            expect(clientResult.isFailure()).toBeFalsy();
            expect(clientResult.isSuccess()).toBeTruthy();

            if (clientResult.isSuccess()) {
                const client = clientResult.value;
                expect(client.email.value).toBe('erickzikabta@gmail.com');
            }
        });

        it('sould be able to retrive a error in case of email invalid', async () => {
            const { sut } = makeSut();
            const clientResult = await sut.loadByEmail('invalid@@');

            expect(clientResult.isFailure()).toBeTruthy();
            expect(clientResult.value as DomainError).toHaveProperty(
                'message',
                'The email not is valid',
            );
        });
    });

    describe('loadProductsByEmail', () => {
        it('sould be able to retrieve products by email', async () => {
            const { sut } = makeSut();
            const result = await sut.loadProductsByEmail(
                'higorgrigorio@gmail.com',
            );

            expect(result.isSuccess()).toBeTruthy();
            expect(result.value).toBeInstanceOf(Array<Product>);
        });
    });
});
