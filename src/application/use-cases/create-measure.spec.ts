import { IMeasureRepository } from '@application/repositories/measure-repository';
import {
    AsyncDomainErrorOr,
    DomainErrorOr,
} from '@core/domain/domain-error-or';
import { success } from '@core/logic';
import { describe, it, expect } from '@jest/globals';
import { makeRawMeasure } from '@tests/factories/raw-measure-factory';
import { CreateMeasurement } from './create-measure';

const nop = void 0;

class MeasureRepositoryMock implements IMeasureRepository {
    callsCount: number = 0;
    async create(): AsyncDomainErrorOr<void> {
        this.callsCount++;
        return success(nop);
    }
}

type SutTypes = {
    sut: CreateMeasurement;
    measureRepositoryMock: MeasureRepositoryMock;
};

const makeSut = (): SutTypes => {
    const measureRepositoryMock = new MeasureRepositoryMock();
    return {
        sut: new CreateMeasurement(measureRepositoryMock),
        measureRepositoryMock,
    };
};

describe('CreateMeasure', () => {
    it('should be able to create a measurement', () => {
        const { sut, measureRepositoryMock } = makeSut();

        sut.execute({...makeRawMeasure()});

        expect(measureRepositoryMock.callsCount).toBe(1);
    });
});
