import { DomainErrorOr } from '@core/domain/domain-error-or';
import { EmailValidator } from '@core/domain/email-validator';
import { InvalidEmaiError } from '@core/domain/errors';
import { failure, success } from '@core/logic';

interface EmailProps {
    value: String;
}

export class Email {
    private constructor(private props: EmailProps) {
    }

    get value(): String {
        return this.props.value;
    }

    static create({ value }: EmailProps): DomainErrorOr<Email> {
        if (!EmailValidator.create({ email: value }).validate()) {
            return failure(new InvalidEmaiError({ email: value }));
        }
        return success(new Email({ value }));
    }
}
