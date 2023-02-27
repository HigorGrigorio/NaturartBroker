import { describe, expect, it } from '@jest/globals';
import { Email } from './email';

type SutProps = { email: String}

const makeSut = (props: SutProps) => {
    return Email.create({value: props.email});
}

describe('Email objected value', () => {
    it('should be able to create an email', () => {
        const sut = makeSut({ email: 'john@test.com' });

        expect(sut.isFailure()).toBe(false);
        expect(sut.isSuccess()).toBe(true);
        expect(sut.value).toBeInstanceOf(Email);
    })
});
