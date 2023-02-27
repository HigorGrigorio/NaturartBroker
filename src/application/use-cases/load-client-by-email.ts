import { AsyncErrorOr } from '@core/use-cases';
import { Service } from '@core/use-cases';
import { UseCaseError } from '@core/use-cases/errors';
import { failure, success } from '@core/logic';
import { Client } from '@domain/entities';
import { IClientRepository } from '@application/repositories/client-repository';

export interface LoadClientByEmailResquest {
    email: String;
}

export class LoadClientByEmail extends Service<
    LoadClientByEmailResquest,
    Client
> {
    constructor(private readonly clientRepository: IClientRepository) {
        super();
    }

    async execute(request: LoadClientByEmailResquest): AsyncErrorOr<Client> {
        const clientResult = await this.clientRepository.loadByEmail(
            request.email,
        );

        if (clientResult.isFailure()) {
            return failure(
                new UseCaseError(
                    'LoadClientByEmailResquest',
                    clientResult.value.message,
                ),
            );
        }

        return success(clientResult.value);
    }
}
