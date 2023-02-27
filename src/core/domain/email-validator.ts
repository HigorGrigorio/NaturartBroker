import { Validator } from '@core/domain/validator';

interface EmailValidatorProps {
    email: String;
}

export class EmailValidator extends Validator {
    constructor(private props: EmailValidatorProps) {
        super();
    }

    validate(): Boolean {
        const { email } = this.props;
        const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email.toLowerCase());
    }

    static create(props: EmailValidatorProps): EmailValidator {
        return new EmailValidator(props);
    }
}
