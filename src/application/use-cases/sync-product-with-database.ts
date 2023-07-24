import { IClientRepository } from '@application/repositories/client-repository';
import { failure, success } from '@core/logic';
import { AsyncErrorOr, Service } from '@core/use-cases';
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
    data: string;
}

export class SyncProductWithDatabase
    implements Service<
        SyncProductWithDatabaseRequest,
        SyncProductWithDatabaseResponse
    > {
    constructor(private clientRepository: IClientRepository) {
    }

    async execute(
        request: SyncProductWithDatabaseRequest,
    ): AsyncErrorOr<SyncProductWithDatabaseResponse> {
        const { email, password, cpf, serialCode } = request;

        // validade the client
        const clientResult = await this.clientRepository.login(email, password);

        if (clientResult.isFailure()) {
            return failure(new UserNotFound(clientResult.value.message));
        }

        // valid client
        const { value: client } = clientResult;

        const productResult = await this.clientRepository.loadProductsByEmail(
            email,
        );

        console.log(productResult);

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

        let result = 'success=true;';

        types.forEach((type) => {
            const id = product.items
                .filter(
                    (item) =>
                        item.idProduct === product.id &&
                        item.idType === type.id,
                )
                .at(0)?.id ?? -1;

            result += `${type.name}=${id};`;
        });

        return success({ data: result });
    }
}
