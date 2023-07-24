import { Validator } from '@core/domain/validator';

interface CPFValidatorParams {
    cpf: String;
}

export class CPFValidator extends Validator {
    constructor(private params: CPFValidatorParams) {
        super();
    }

    static create(params: CPFValidatorParams): CPFValidator {
        return new CPFValidator(params);
    }

    validate(): Boolean {
        const { cpf } = this.params;
        const noAlphaNumericRegex = /[^\d]+/g;

        if (noAlphaNumericRegex.test(cpf.toLocaleLowerCase()) && (!this.validadeMask())) {
            return false;
        }

        // remove all non-numeric characters from the CPF
        const cpfNumeric = cpf.replace(/[^\d]+/g, '');

        // check that the CPF is 11 digits long
        if (cpfNumeric.length !== 11) {
            return false;
        }

        // check that the CPF is not all zeroes
        if (cpfNumeric.match(/^0+$/)) {
            return false;
        }

        // check that the CPF is valid using the verification digits algorithm
        let sum = 0;
        let rest;

        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(cpfNumeric.substring(i - 1, i)) * (11 - i);
        }

        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) {
            rest = 0;
        }

        if (rest !== parseInt(cpfNumeric.substring(9, 10))) {
            return false;
        }

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(cpfNumeric.substring(i - 1, i)) * (12 - i);
        }

        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) {
            rest = 0;
        }

        if (rest !== parseInt(cpfNumeric.substring(10, 11))) {
            return false;
        }

        return true;
    }

    private validadeMask(): Boolean {
        const { cpf } = this.params;

        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return cpfRegex.test(cpf.toLocaleLowerCase());
    }
}
