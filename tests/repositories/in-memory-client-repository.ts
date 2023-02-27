import { IClientRepository } from '@application/repositories/client-repository';
import { Client } from '@domain/entities';
import {
    AsyncDomainErrorOr,
    DomainErrorOr,
} from '@core/domain/domain-error-or';
import { UndefinedClientError } from '@core/domain/errors/undefined-client-error';
import { failure, success } from '@core/logic';
import { Product } from '@domain/entities/product';

export class InMemoryClientRepository implements IClientRepository {
    loadProductsByEmail(
        email: String,
    ): AsyncDomainErrorOr<Product[]> | DomainErrorOr<Product[]> {
        throw new Error('Method not implemented.');
    }
    clients: Client[] = [];

    async loadByEmail(email: String): AsyncDomainErrorOr<Client> {
        const client = this.clients.find(
            (client) => client.email.value === email,
        );

        if (!client) {
            return failure(new UndefinedClientError(null));
        }

        return success(client);
    }

    async create(client: Client): Promise<Boolean> {
        this.clients.push(client);
        return true;
    }
}
