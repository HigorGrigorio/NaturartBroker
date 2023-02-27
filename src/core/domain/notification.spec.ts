import { describe, it, expect } from '@jest/globals';
import { Notification } from '@core/domain/notification';

describe('Notification', () => {
    it('should be able add a error into notification', () => {
        const sut = new Notification();

        sut.addError({
            context: 'Error1',
            domainError: { message: 'some error' },
        });

        expect(sut.errors.length).toBe(1);
    });

    it('should be able return all errors into unique message string', () => {
        const sut = new Notification();

        sut.addError({
            context: 'Error1',
            domainError: { message: 'some error' },
        }).addError({
            context: 'Error2',
            domainError: { message: 'some error' },
        })

        expect(sut.message).toBe('Error1:some error,Error2:some error');
    });
});
