import { AsyncDomainErrorOr, DomainErrorOr } from '@core/domain/domain-error-or';
import { NaturartResponse } from '@core/infra/NaturarResponse';
import { IClientRepository } from '@application/repositories/client-repository';
import { failure, success } from '@core/logic';
import { Client } from '@domain/entities';
import { HttpClient } from '@infra/helpers/http-client';
import { ClientMap } from '@infra/mappers/client-map';
import { Client as RawClient } from '@infra/api/client';
import { DomainErrorMap } from '@infra/mappers/domain-error-map';
import { Product } from '@domain/entities/product';
import { Product as ProductRaw } from '@infra/api/product';
import { ProductMap } from '@infra/mappers/product-map';

export class HttpClientRepository implements IClientRepository {
    constructor(private httpClient: HttpClient) {
    }

    async login(email: String, password: String): AsyncDomainErrorOr<Client> {
        const naturartResponse = await this.httpClient.get<
            NaturartResponse<RawClient>
        >(`/client/login?email=${email}&password=${password}`);

        if (naturartResponse.isError) {
            return failure(DomainErrorMap.toDomain(naturartResponse));
        }

        return success(ClientMap.toDomain(naturartResponse.data));
    }

    async loadProductsByEmail(email: String): AsyncDomainErrorOr<Product[]> {
        const naturartResponse = await this.httpClient.get<
            NaturartResponse<ProductRaw[]>
        >(`/client/getProductsByEmail?email=${email}`);

        if (naturartResponse.isError) {
            return failure(DomainErrorMap.toDomain(naturartResponse));
        }

        return success(
            naturartResponse.data.map((product) =>
                ProductMap.toDomain(product),
            ),
        );
    }

    async loadByEmail(email: String): AsyncDomainErrorOr<Client> {
        const naturartResponse = await this.httpClient.get<
            NaturartResponse<RawClient>
        >(`/client/getByEmail?email=${email}`);

        if (naturartResponse.isError) {
            return failure(DomainErrorMap.toDomain(naturartResponse));
        }

        const client = ClientMap.toDomain(naturartResponse.data);
        console.log(client)

        return success(client);
    }
}
