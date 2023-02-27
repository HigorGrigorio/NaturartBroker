import { DomainError } from "./domain-error";

export class InvalidEmaiError implements DomainError {
    message: String;

    constructor(props: {email: String}) {
        this.message = `Invalid email: ${props.email}`;
    }
}
