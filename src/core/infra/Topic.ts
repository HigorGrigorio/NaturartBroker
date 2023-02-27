import { PayloadResponse } from '@core/infra';
import { HttpRequest } from '@core/infra';
import 'reflect-metadata';

export abstract class ITopic<T = HttpRequest> {
    abstract handle(request: T): Promise<PayloadResponse>;
}
