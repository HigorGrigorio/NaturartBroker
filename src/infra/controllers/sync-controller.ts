import { SyncProductWithDatabase } from '@application/use-cases/sync-product-with-database';
import { PayloadResponse, ITopic, fail, ok } from '@core/infra';
import { SyncControllerBody } from '@infra/dtos/sync-controller-body';
import { HttpClient } from '@infra/helpers/http-client';
import { HttpClientRepository } from '@infra/repositories/http-client-repository';

export class SyncController extends ITopic<SyncControllerBody> {
    constructor(private syncProductWithDatabase: SyncProductWithDatabase) {
        super();
    }

    async handle(request: SyncControllerBody): Promise<PayloadResponse> {
        const result = await this.syncProductWithDatabase.execute({
            ...request,
        });


        if (result.isFailure()) {
            return fail(new Error(result.value.message.toString()));
        }

        return ok(result.value);
    }

    static default(): SyncController {
        const httpClient = HttpClient.default();
        const repository = new HttpClientRepository(httpClient);
        const service = new SyncProductWithDatabase(repository);
        return new SyncController(service);
    }
}
