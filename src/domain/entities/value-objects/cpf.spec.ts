import { InvalidCPFError } from '@core/domain/errors/invalid-cpf-error';
import { it, expect, describe } from '@jest/globals';
import { CPF } from '@domain/entities/value-objects/cpf';

type SutParams = { cpf: String };

const makeSut = (params: SutParams) => {
    return CPF.create({ value: params.cpf });
};

describe('CPF objected value', () => {
    it('should be able to create a new instance of CPF', () => {
        const errorOrCpf = makeSut({ cpf: '15576173686' });

        expect(errorOrCpf.isFailure()).toBe(false);
        expect(errorOrCpf.isSuccess()).toBe(true);
        expect(errorOrCpf.value).toBeInstanceOf(CPF);
    });

    it('should not be able to create a new CPF instancewith less than 11 characters', () => {
        const errorOrCpf = makeSut({ cpf: '123' });

        expect(errorOrCpf.isFailure()).toBe(true);
        expect(errorOrCpf.isSuccess()).toBe(false);
        expect(errorOrCpf.value).toBeInstanceOf(InvalidCPFError);
    });

    it('should not be able to create a new CPF instance with greather than 11 characters', () => {
        const errorOrCpf = makeSut({ cpf: '1'.repeat(12) });

        expect(errorOrCpf.isFailure()).toBe(true);
        expect(errorOrCpf.isSuccess()).toBe(false);
        expect(errorOrCpf.value).toBeInstanceOf(InvalidCPFError);
    });

    it('should be not able cpf with wrong mask cpf', () => {
        const sut = makeSut({ cpf: '484-943-708.71' });
        expect(sut.value).toBeInstanceOf(InvalidCPFError);
    });
});
