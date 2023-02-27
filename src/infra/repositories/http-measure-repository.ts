import { IMeasureRepository } from '@application/repositories/measure-repository';
import { AsyncDomainErrorOr } from '@core/domain/domain-error-or';
import { NaturartResponse } from '@core/infra/NaturarResponse';
import { success } from '@core/logic';
import { Measure } from '@domain/entities/measure';
import { HttpClient } from '@infra/helpers/http-client';
import { Measure as MeasureRaw } from '@infra/api/measure';
export class HttpMeasureRepository implements IMeasureRepository {
    constructor(private httpClient: HttpClient) {}

    async create(measure: Measure): AsyncDomainErrorOr<void> {
        await this.httpClient.get<NaturartResponse<MeasureRaw>>(
            `/measurement/add?measurementDate=${measure.measurementDate}&value=${measure.measure}&idSensorTypeProduct=${measure.idSensorTypeProduct}`,
        );

        return success(void 0);
    }
}
