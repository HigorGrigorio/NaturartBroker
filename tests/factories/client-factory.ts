import { Maybe } from '@core/logic';
import { Override } from '@core/logic/Override';
import { Client, RawClientProps } from '@domain/entities';
import { faker } from '@faker-js/faker';
import { makeRawCpf } from './raw-cpf-factory';

export function makeClient(
    override: Override<RawClientProps> = {},
    id: Maybe<Number> = null,
): Client {
    const clientResult = Client.create(
        {
            email: faker.internet.email(),
            password: faker.internet.password(),
            name: faker.name.fullName(),
            cpf: makeRawCpf(),
            ...override,
        },
        id,
    );

    if (clientResult.isSuccess()) {
        return clientResult.value;
    }

    throw clientResult.value;
}
