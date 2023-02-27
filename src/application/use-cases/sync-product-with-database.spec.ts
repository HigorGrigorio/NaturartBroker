import { IClientRepository } from '@application/repositories/client-repository';
import { failure, success } from '@core/logic';
import { Client } from '@domain/entities';
import { Product } from '@domain/entities/product';
import { expect } from '@jest/globals';
import { makeClient } from '@tests/factories/client-factory';
import { makeProduct } from '@tests/factories/product-factory';
import { makeProductType } from '@tests/factories/product-type-factory';
import { describe, it } from '@jest/globals';
import { SyncProductWithDatabase } from './sync-product-with-database';
import { AsyncErrorOr } from '@core/use-cases';
import { UserNotFound } from '@core/use-cases/errors/UserNotFound';
import { ProductNotFound } from '@core/use-cases/errors/ProductNotFound';
import { InvalidCredentials } from '@core/use-cases/errors/InvalidCredentials';
import { UndefinedProducts } from '@core/use-cases/errors/UndefinedProduct';

class ClientRepositoryMock implements IClientRepository {
    email: String;
    callsCount: Number;

    async loadByEmail(email: String): AsyncErrorOr<Client> {
        if (email === 'noemail@gmail.com') {
            return failure(new UserNotFound(email));
        }

        return success(
            makeClient({
                email: 'mockdata@gmail.com',
                password: '12345',
                cpf: '82136805967',
            }),
        );
    }

    async loadProductsByEmail(email: String): AsyncErrorOr<Product[]> {
        if (email === 'notfound@gmail.com') {
            const product = makeProduct({ serialCode: '12456' });
            const type = makeProductType({ name: 'Temperature' });

            product.addType(type, 12345);
            return success([product]);
        }

        if (email !== 'noproducts@gmail.com') {
            const product = makeProduct({ serialCode: '12345' });
            const type = makeProductType({ name: 'Temperature' });

            product.addType(type, 12345);
            return success([product]);
        }

        return failure(new ProductNotFound());
    }
}

type SutTypes = {
    sut: SyncProductWithDatabase;
    clientRepository: ClientRepositoryMock;
};

const makeSut = (): SutTypes => {
    const clientRepository: ClientRepositoryMock = new ClientRepositoryMock();

    return {
        sut: new SyncProductWithDatabase(new ClientRepositoryMock()),
        clientRepository,
    };
};

describe('SyncProductWithDatabase', () => {
    it('should be able retrieve the types of the product from database', async () => {
        const { sut } = makeSut();
        const rawCpf = '82136805967';
        const result = await sut.execute({
            email: 'mockdata@gmail.com',
            password: '12345',
            cpf: rawCpf,
            serialCode: '12345',
        });

        expect(result.value).toEqual({
            data: [
                {
                    type: 'Temperature',
                    id: '12345',
                },
            ],
        });
    });

    describe('should not be able sync the product with database', () => {
        it(`when the email don't exist`, async () => {
            const { sut } = makeSut();
            const result = await sut.execute({
                email: 'noemail@gmail.com',
                password: '12345',
                cpf: '82136805967',
                serialCode: '12345',
            });

            expect((result.value as UserNotFound).message).toBe(
                'noemail@gmail.com',
            );
        });

        it(`when the cpf doesn't not match with the user`, async () => {
            const { sut } = makeSut();
            const result = await sut.execute({
                email: 'mockdata@gmail.com',
                password: '12345',
                cpf: '82136865967',
                serialCode: '12345',
            });

            expect((result.value as InvalidCredentials).message).toBe(
                'Invalid credentials',
            );
        });

        it(`when the password doesn't not match not with the user`, async () => {
            const { sut } = makeSut();
            const result = await sut.execute({
                email: 'mockdata@gmail.com',
                password: '1245',
                cpf: '57888771807',
                serialCode: '12345',
            });

            console.log(result);

            expect((result.value as InvalidCredentials).message).toBe(
                'Invalid credentials',
            );
        });

        it(`when the client doesn't not have products relateds in the database`, async () => {
            const { sut } = makeSut();
            const result = await sut.execute({
                email: 'noproducts@gmail.com',
                password: '12345',
                cpf: '82136805967',
                serialCode: '12345',
            });

            expect((result.value as UndefinedProducts).message).toBe(
                'The user not have products in the database',
            );
        });

        it(`when the serial code does not match any of the user's products `, async () => {
            const { sut } = makeSut();
            const result = await sut.execute({
                email: 'notfound@gmail.com',
                password: '12345',
                cpf: '82136805967',
                serialCode: '12345',
            });

            expect((result.value as ProductNotFound).message).toBe('Product not found');
        });
    });
});
