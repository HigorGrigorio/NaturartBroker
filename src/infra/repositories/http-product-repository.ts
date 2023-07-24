import { IProductRepository } from '@application/repositories/product-repository';
import { AsyncDomainErrorOr } from '@core/domain/domain-error-or';
import { NaturartResponse } from '@core/infra/NaturarResponse';
import { failure, success } from '@core/logic';
import { Product } from '@domain/entities/product';
import { HttpClient } from '@infra/helpers/http-client';
import { DomainErrorMap } from '@infra/mappers/domain-error-map';
import { ProductMap } from '@infra/mappers/product-map';
import { Product as RawProduct } from '@infra/api/product';

export class HttpProductRepository implements IProductRepository {
    public constructor(private httpClient: HttpClient) {
    }

    public async loadBySerialCode(
        serialCode: String,
    ): AsyncDomainErrorOr<Product> {
        const naturartResponse = await this.httpClient.get<
            NaturartResponse<RawProduct>
        >(`/product/getBySerialCode?serialCode=${serialCode}`);

        if (naturartResponse.isError) {
            return failure(DomainErrorMap.toDomain(naturartResponse));
        }

        return success(ProductMap.toDomain(naturartResponse.data));
    }
}
