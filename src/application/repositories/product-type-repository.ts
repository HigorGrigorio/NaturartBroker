import {
    AsyncDomainErrorOr,
    DomainErrorOr,
} from '@core/domain/domain-error-or';
import { Product } from '@domain/entities/product';

export interface IProductTypeRepository {
    loadByTypeName(
        typeName: String,
    ): AsyncDomainErrorOr<Product> | DomainErrorOr<Product>;
}
