import { beforeAll, describe, expect, it } from '@jest/globals';
import { InMemoryClientRepository } from '@tests/repositories/in-memory-client-repository';
import { makeClient } from '@tests/factories/client-factory';
import { LoadClientByEmail } from '@application/use-cases/load-client-by-email';
import { IClientRepository } from '@application/repositories/client-repository';
import { Client } from '@domain/entities';

const makeSut = (
    loadClientByEmailRepository: IClientRepository,
): LoadClientByEmail => new LoadClientByEmail(loadClientByEmailRepository);

describe('Client', () => {
    let inMemoryClientRepository: InMemoryClientRepository;

    beforeAll(async () => {
        inMemoryClientRepository = new InMemoryClientRepository();
        inMemoryClientRepository.create(
            makeClient({ email: 'user1@example.com' }),
        );
    });

    it('should be able to load a client from database', async () => {
        const sut = makeSut(inMemoryClientRepository);
        const userResult = await sut.execute({ email: 'user1@example.com' });

        expect(userResult.isFailure()).toBe(false);
        expect(userResult.value).toBeInstanceOf(Client);
    });

});
