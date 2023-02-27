import { HttpClientConfig } from '@core/infra/HttpClient';

require('dotenv').config();

export const config = {
    baseURL: process.env.AXIOS_BASE_URL,
} as HttpClientConfig;
