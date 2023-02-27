import { describe, expect, it } from '@jest/globals';
import { EmailValidator } from '@core/domain/email-validator';

type SutTypes = { email: String };

const makeSut = (props: SutTypes): EmailValidator => {
    return new EmailValidator({ ...props });
};

describe('EmailValidator', () => {
    it('should be able returns true in case of valide email', () => {
        const sut = makeSut({ email: 'foo@example.com' });

        expect(sut.validate()).toBe(true);
    });

    it('should be able returns false in case of invalid email', () => {
        const sut = makeSut({ email: 'foo@example@.com' });

        expect(sut.validate()).toBe(false);
    });
});
