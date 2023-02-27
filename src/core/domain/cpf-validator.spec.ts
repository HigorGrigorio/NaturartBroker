import { describe, expect, it } from '@jest/globals';
import { CPFValidator } from '@core/domain/cpf-validator';

type SutProps = { cpf: String };

const makeSut = (props: SutProps): CPFValidator =>
    new CPFValidator({ ...props });

describe('CPFValidor', () => {
    it('should be able to returns true in case of valid cpf', () => {
        const sut = makeSut({ cpf: '48494370871' });

        expect(sut.validate()).toBe(true);
    });

    it('should be able to ruturns false in case of valid cpf', () => {
        const sut = makeSut({ cpf: '123456789' });

        expect(sut.validate()).toBe(false);
    });

    it('should be not able cpf with wrong mask cpf', () => {
        const sut = makeSut({ cpf: '484-943-708.71' });

        expect(sut.validate()).toBe(false);
        expect(makeSut({ cpf: '484.943.708-71' }).validate()).toBe(true);
    });
});
