import { Override } from '@core/logic/Override';
import { MeasureProps, Measure } from '@domain/entities/measure';
import { faker } from '@faker-js/faker';

export function makeMeasure(override?: Override<MeasureProps>): Measure {
    const measure = Measure.create(
        {
            measure: faker.random.alphaNumeric(40),
            idSensorTypeProduct: Number(faker.random.alphaNumeric(10)),
            ...override,
        },
        null,
    );

    return measure;
}
