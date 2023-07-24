import { Notification } from '@core/domain/notification';
import { IPayloadHandler } from '@core/infra/PayloadHandle';
import { Broker } from '@infra/broker';
import { SyncController } from '@infra/controllers/sync-controller';

export class SyncPayload implements IPayloadHandler {
    private payload: any | null = null;

    constructor(
        private syncController: SyncController,
        private provider: Broker,
    ) {
    }

    async handle(payload: any): Promise<void> {
        try {
            this.payload = payload;
            const notification = this.validate();
            if (notification.errors.length > 0) {
                throw new Error(notification.message);
            }
            const { uuid } = payload;
            const result = await this.syncController.handle({ ...payload });
            this.provider.publish({
                topic: uuid,
                payload: result.body.data
            });
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
        } else if (!this.payload.uuid) {
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
