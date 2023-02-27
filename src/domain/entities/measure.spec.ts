import { describe, it, expect } from '@jest/globals';
import { Measure } from '@domain/entities/measure';
import { makeMeasure } from '@tests/factories/measure-factory';
import { makeRawMeasure } from '@tests/factories/raw-measure-factory';

type SutTypes = { sut: Measure };

describe('Measure', () => {
    describe('create', () => {
        it('should be able to create a new measure', () => {
            const sut = Measure.create(
                {
                    ...makeRawMeasure(),
                    measurementDate: new Date()
                },
                null,
            );

            expect(sut).toBeInstanceOf(Measure);
        });

        it('should be able to create a new measure with the date of now', () => {
            const date = new Date();
            const sut = Measure.create(
                {
                    ...makeRawMeasure(),
                    measurementDate: date,
                },
                null,
            );

            expect(sut.measurementDate).toEqual(date);
        });
    });
});
