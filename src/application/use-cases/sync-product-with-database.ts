import { IClientRepository } from '@application/repositories/client-repository';
import { IProductRepository } from '@application/repositories/product-repository';
import { failure, success } from '@core/logic';
import { AsyncErrorOr, ErrorOr, Service } from '@core/use-cases';
import { InvalidCredentials } from '@core/use-cases/errors/InvalidCredentials';
import { ProductNotFound } from '@core/use-cases/errors/ProductNotFound';
import { UndefinedProducts } from '@core/use-cases/errors/UndefinedProduct';
import { UserNotFound } from '@core/use-cases/errors/UserNotFound';

interface SyncProductWithDatabaseRequest {
    email: String;
    password: String;
    cpf: String;
    serialCode: String;
}

interface SyncProductWithDatabaseResponseItem {
    type: String;
    id: String;
}

interface SyncProductWithDatabaseResponse {
    data: Array<SyncProductWithDatabaseResponseItem>;
}

export class SyncProductWithDatabase
    implements
        Service<
            SyncProductWithDatabaseRequest,
            SyncProductWithDatabaseResponse
        >
{
    constructor(private clientRepository: IClientRepository) {}

    async execute(
        request: SyncProductWithDatabaseRequest,
    ): AsyncErrorOr<SyncProductWithDatabaseResponse> {
        const { email, password, cpf, serialCode } = request;

        // validade the client
        const clientResult = await this.clientRepository.loadByEmail(email);

        if (clientResult.isFailure()) {
            return failure(new UserNotFound(clientResult.value.message));
        }

        // valid client
        const { value: client } = clientResult;

        // validate client credentials;
        if (!client.checkPassword(password) || !client.cpfMatch(cpf)) {
            return failure(new InvalidCredentials());
        }

        const productResult = await this.clientRepository.loadProductsByEmail(
            email,
        );

        if (productResult.isFailure()) {
            return failure(new UndefinedProducts());
        }

        const product = productResult.value.find(
            (item) => item.serialCode === serialCode,
        );

        if (!product) {
            return failure(new ProductNotFound());
        }

        const { types } = product;
        const data: Array<SyncProductWithDatabaseResponseItem> = [];

        types.forEach((type) => {
            data.push({
                type: type.name,
                id: (
                    product.items
                        .filter(
                            (item) =>
                                item.idProduct === product.id &&
                                item.idType === type.id,
                        )
                        .at(0) ?? { id: 0 }
                ).id.toString(),
            });
        });

        return success({ data });
    }
}
