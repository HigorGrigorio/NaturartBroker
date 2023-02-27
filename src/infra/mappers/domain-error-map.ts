import { DomainError } from '@core/domain/errors';
import { NaturartResponse } from '@core/infra/NaturarResponse';

export class DomainErrorMap {
    static toDomain(naturartResponse: NaturartResponse<any>): DomainError {
        if (!naturartResponse.isError) {
            throw new Error('The reponse is not a valid domain error');
        }

        return {
            message: naturartResponse.msg,
        };
    }
}
