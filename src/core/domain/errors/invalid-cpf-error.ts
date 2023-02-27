import { DomainError } from './domain-error';

export class InvalidCPFError implements DomainError {
    message: String;

    constructor(props: { cpf: String }) {
        this.message = `Invalid CPF Error: ${props.cpf}`;
    }
}
