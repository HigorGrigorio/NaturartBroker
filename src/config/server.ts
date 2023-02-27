import { BrokerOptions } from '@infra/broker';

require('dotenv').config();

export const config: BrokerOptions = {
    port: process.env.PORT ?? 4001,
    host: process.env.HOST ?? 'http://localhost',
} as BrokerOptions;
