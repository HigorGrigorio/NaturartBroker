import { AsyncErrorOr, ErrorOr } from '@core/use-cases/ErrorOr';

export abstract class Service<IRequest, IResponse> {
    abstract execute(
        request: IRequest,
    ): ErrorOr<IResponse> | AsyncErrorOr<IResponse>;
}
