import { Notification } from '@core/domain/notification';

export class CreateMeasureControllerBody {
    constructor(public measure: String, public idSensorTypeProduct: String) {
        const notification = this.validate();

        if (notification.errors.length > 0) {
            throw new Error(notification.message);
        }
    }

    private validate(): Notification {
        const notification = new Notification();

        if (!this.measure) {
            notification.addError({
                context: 'Measure',
                domainError: {
                    message: 'The measure is required.',
                },
            });
        }

        if (!this.idSensorTypeProduct) {
            notification.addError({
                context: 'idSensorTypeProduct',
                domainError: {
                    message: 'The idSensorTypeProduct is required.',
                },
            });
        }

        if (this.measure === '') {
            notification.addError({
                context: 'Measure',
                domainError: {
                    message: 'The cannot be empty.',
                },
            });
        }

        if (this.idSensorTypeProduct === '') {
            notification.addError({
                context: 'idSensorTypeProduct',
                domainError: {
                    message: 'The idSensorTypeProduct be empty.',
                },
            });
        }

        return notification;
    }
}
