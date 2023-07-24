import { Client } from '@domain/entities';
import { Client as ClientPersistence } from '@infra/api/client';

export class ClientMap {
    public static toDomain(raw: ClientPersistence): Client {
        const clientResult = Client.create(
            {
                name: raw.name,
                email: raw.email,
                cpf: raw.cpf,
            },
            raw.id,
        );

        if (clientResult.isFailure()) {
            throw new Error(clientResult.value.message.toString());
        }

        return clientResult.value;
    }
}
