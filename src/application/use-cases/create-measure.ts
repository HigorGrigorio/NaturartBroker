import { IMeasureRepository } from '@application/repositories/measure-repository';
import { success } from '@core/logic';
import { AsyncErrorOr, ErrorOr, Service } from '@core/use-cases';
import { Measure } from '@domain/entities/measure';

export interface CreateMeasureRequest {
    measure: String;
    idSensorTypeProduct: String;
}

export type CreateMeasureResponse = void;

export class CreateMeasurement
    implements Service<CreateMeasureRequest, CreateMeasureResponse>
{
    constructor(private readonly measureRepository: IMeasureRepository) {}

    async execute(request: CreateMeasureRequest): AsyncErrorOr<void> {
        this.measureRepository.create(
            Measure.create({ ...request, measurementDate: new Date() }, null),
        );
        return success(void 0);
    }
}
