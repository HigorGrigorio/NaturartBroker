import { config } from '@config/server';
import { Maybe } from '@core/logic';
import { Override } from '@core/logic/Override';
import { MqttServer, MqttServerProps } from '@infra/mqtt-server';
import { Server } from 'net';

export const makeServer = (
    override: Override<MqttServerProps> = {},
    server: Maybe<Server> = null,
) => {
    const instance = new MqttServer({ ...config, ...override }, server);
    return instance;
};
