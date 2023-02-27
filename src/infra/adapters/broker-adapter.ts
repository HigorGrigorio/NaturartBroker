import { Broker } from '@infra/broker';
import { IncomingMessage } from 'node:http';
import { Socket } from 'node:net';

export function adaptBroker(broker: Broker) {
    return (socket: Socket): void => {
        broker.handle(socket);
    };
}
