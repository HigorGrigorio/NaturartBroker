import {
    AsyncDomainErrorOr,
    DomainErrorOr,
} from '@core/domain/domain-error-or';
import { Product } from '@domain/entities/product';

export interface IProductRepository {
    loadBySerialCode(
        serialCode: String,
    ): AsyncDomainErrorOr<Product> | DomainErrorOr<Product>;
}
