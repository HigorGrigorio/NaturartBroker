import { CreateMeasurement } from '@application/use-cases/create-measure';
import { ITopic, ok, PayloadResponse } from '@core/infra';
import { CreateMeasureControllerBody } from '@infra/dtos/measure-controller-body';
import { HttpClient } from '@infra/helpers/http-client';
import { HttpMeasureRepository } from '@infra/repositories/http-measure-repository';

export class CreateMeasurementController
    implements ITopic<CreateMeasureControllerBody>
{
    constructor(private createMeasurementService: CreateMeasurement) {}

    async handle(
        request: CreateMeasureControllerBody,
    ): Promise<PayloadResponse> {
        await this.createMeasurementService.execute({
            ...request,
        });

        return ok(void 0);
    }

    public static default() {
        const httpClient = HttpClient.default();
        const measureRepository = new HttpMeasureRepository(httpClient);
        const createMeasurementService = new CreateMeasurement(measureRepository);
        return new CreateMeasurementController(createMeasurementService);
    }
}
