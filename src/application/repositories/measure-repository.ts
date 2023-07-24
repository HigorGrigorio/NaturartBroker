import { AsyncDomainErrorOr, DomainErrorOr } from '@core/domain/domain-error-or';
import { Measure } from '@domain/entities/measure';

export interface IMeasureRepository {
    create(measure: Measure): AsyncDomainErrorOr<void> | DomainErrorOr<void>;
}
