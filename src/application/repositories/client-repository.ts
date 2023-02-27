import {
    AsyncDomainErrorOr,
    DomainErrorOr,
} from '@core/domain/domain-error-or';
import { Client } from '@domain/entities';
import { Product } from '@domain/entities/product';

export interface IClientRepository {
    loadByEmail(
        email: String,
    ): AsyncDomainErrorOr<Client> | DomainErrorOr<Client>;

    loadProductsByEmail(
        email: String,
    ): AsyncDomainErrorOr<Product[]> | DomainErrorOr<Product[]>;
}
