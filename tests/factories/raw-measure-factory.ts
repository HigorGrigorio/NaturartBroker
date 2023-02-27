import { Override } from '@core/logic/Override';
import { faker } from '@faker-js/faker';

export type RawMeasure = { measure: String; idSensorTypeProduct: String };

export function makeRawMeasure(override?: Override<RawMeasure>): RawMeasure {
    return {
        measure: faker.random.alphaNumeric(40),
        idSensorTypeProduct: faker.random.alphaNumeric(10),
        ...override,
    };
}
