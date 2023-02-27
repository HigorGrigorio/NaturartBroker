import { HttpClientConfig, IHttpClient } from '@core/infra/HttpClient';
import { config } from '@config/axios';

import fetch from 'cross-fetch';

export class HttpClient implements IHttpClient {
    constructor(private config: HttpClientConfig) {}

    public async get<T>(url: string): Promise<T> {
        return (await fetch(config.baseURL + url)).json() as T;
    }

    public async post<T>(url: string): Promise<T> {
        return (await fetch(config.baseURL + url)).json() as T;
    }

    public async put<T>(url: string): Promise<T> {
        return (await fetch(config.baseURL + url)).json() as T;
    }

    public async delete<T>(url: string): Promise<T> {
        return (await fetch(config.baseURL + url)).json() as T;
    }

    public static default(): HttpClient {
        return new HttpClient(config);
    }
}
