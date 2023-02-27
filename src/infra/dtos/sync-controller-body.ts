import { CPFValidator } from '@core/domain/cpf-validator';
import { EmailValidator } from '@core/domain/email-validator';
import { Notification } from '@core/domain/notification';
import { Broker } from '@infra/broker';

export class SyncControllerBody {
    constructor(
        public email: String,
        public password: String,
        public cpf: String,
        public serialCode: String,
    ) {
        const notification = this.validate();

        if (notification.errors.length > 0) {
            throw new Error(notification.message);
        }
    }

    private validate(): Notification {
        const notification = new Notification();
        const emailValidator = new EmailValidator({ email: this.email });
        const cpfValidator = new CPFValidator({ cpf: this.cpf });

        if (!this.email) {
            notification.addError({
                context: 'Email',
                domainError: {
                    message: 'The email is required.',
                },
            });
        }

        if (!emailValidator.validate()) {
            console.log(this.email);
            notification.addError({
                context: 'Email',
                domainError: {
                    message: 'The email is invalid',
                },
            });
        }

        if (!this.password) {
            notification.addError({
                context: 'Password',
                domainError: {
                    message: 'The password is required',
                },
            });
        }

        if (!this.cpf) {
            notification.addError({
                context: 'CPF',
                domainError: {
                    message: 'The cpf is required',
                },
            });
        }

        if (!cpfValidator.validate()) {
            notification.addError({
                context: 'CPF',
                domainError: {
                    message: 'The cpf is invalid',
                },
            });
        }

        if (!this.serialCode) {
            notification.addError({
                context: 'Serial Code',
                domainError: {
                    message: 'The serial code is required',
                },
            });
        }

        return notification;
    }
}
