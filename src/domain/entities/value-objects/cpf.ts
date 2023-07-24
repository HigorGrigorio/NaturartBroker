import { DomainErrorOr } from '@core/domain/domain-error-or';
import { InvalidCPFError } from '@core/domain/errors/invalid-cpf-error';
import { failure, success } from '@core/logic';
import { CPFValidator } from '@core/domain/cpf-validator';

interface CPFProps {
    value: String;
}

export class CPF {
    private constructor(private props: CPFProps) {
    }

    get value(): String {
        return this.props.value;
    }

    set value(value: String) {
        this.props.value = value;
    }

    static create({ value }: CPFProps): DomainErrorOr<CPF> {
        if (!CPFValidator.create({ cpf: value }).validate()) {
            return failure(new InvalidCPFError({ cpf: value }));
        }

        return success(new CPF({ value }));
    }
}
