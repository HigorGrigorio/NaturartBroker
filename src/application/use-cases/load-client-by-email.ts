import { AsyncErrorOr, Service } from '@core/use-cases';
import { UseCaseError } from '@core/use-cases/errors';
import { failure, success } from '@core/logic';
import { Client } from '@domain/entities';
import { IClientRepository } from '@application/repositories/client-repository';

export interface LoadClientByEmailRequest {
    email: String;
}

export class LoadClientByEmail extends Service<
    LoadClientByEmailRequest,
    Client
> {
    constructor(private readonly clientRepository: IClientRepository) {
        super();
    }

    async execute(request: LoadClientByEmailRequest): AsyncErrorOr<Client> {
        const clientResult = await this.clientRepository.loadByEmail(
            request.email,
        );

        if (clientResult.isFailure()) {
            return failure(
                new UseCaseError(
                    'LoadClientByEmailRequest',
                    clientResult.value.message,
                ),
            );
        }

        return success(clientResult.value);
    }
}
