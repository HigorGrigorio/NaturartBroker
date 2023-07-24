import { Notification } from '@core/domain/notification';
import { IPayloadHandler } from '@core/infra/PayloadHandle';
import { CreateMeasurementController } from '@infra/controllers/create-measure-controller';

export class CreateMeasurementPayload implements IPayloadHandler {
    private payload: any | null = null;

    constructor(private createMeasureController: CreateMeasurementController) {
    }

    async handle(payload: any): Promise<void> {
        try {
            this.payload = payload;
            const notification = this.validate();
            if (notification.errors.length > 0) {
                throw new Error(notification.message);
            }
            await this.createMeasureController.handle({ ...payload });
        } catch (err) {
            console.error(err);
        }
    }

    private validate() {
        const notification = new Notification();

        if (!this.payload) {
            notification.addError({
                context: 'Payload',
                domainError: {
                    message: `Expected a not null value to payload`,
                },
            });
        }

        return notification;
    }
}
