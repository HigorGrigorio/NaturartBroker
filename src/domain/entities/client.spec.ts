import { InvalidCPFError, InvalidEmaiError } from '@core/domain/errors';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from '@jest/globals';
import { makeClient } from '@tests/factories/client-factory';
import { makeRawCpf } from '@tests/factories/raw-cpf-factory';
import { Client } from './client';

describe('Client', () => {
    it('should be able to create a client', () => {
        const sut = Client.create(
            {
                name: faker.name.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                cpf: makeRawCpf(),
            },
            null,
        );

        expect(sut.value).toBeInstanceOf(Client);
    });

    it('shuld be not able to create a client with invalid email', () => {
        const sut = Client.create(
            {
                name: faker.name.fullName(),
                email: '',
                password: faker.internet.password(),
                cpf: makeRawCpf(),
            },
            null,
        );

        expect(sut.value).toBeInstanceOf(InvalidEmaiError);
    });

    it('shuld be not able to create a client with invalid cpf', () => {
        const sut = Client.create(
            {
                name: faker.name.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                cpf: '',
            },
            null,
        );

        expect(sut.value).toBeInstanceOf(InvalidCPFError);
    });
});
