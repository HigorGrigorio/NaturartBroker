import { DomainErrorOr } from '@core/domain/domain-error-or';
import { failure, Maybe, success } from '@core/logic';
import { Replace } from '@core/logic/Replace';
import { CPF, Email } from '@domain/entities/value-objects';
import { Product } from '@infra/api/product';
import { randomInt } from 'crypto';

export interface ClientProps {
    name: String;
    cpf: CPF;
    email: Email;
}

export type RawClientProps = Replace<
    ClientProps,
    { email: String; cpf: String }
>;

export class Client {
    private readonly _id: Maybe<Number>;

    constructor(private props: ClientProps, id: Maybe<Number>) {
        this._id = id ?? randomInt(99999999);
    }

    private _products: Array<Product>;

    get products(): Readonly<Array<Product>> {
        return this._products;
    }

    get id(): Maybe<Number> {
        return this._id;
    }

    get name(): String {
        return this.props.name;
    }

    set name(value: String) {
        this.props.name = value;
    }

    get email(): Email {
        return this.props.email;
    }

    set email(value: Email) {
        this.props.email = value;
    }

    get cpf(): CPF {
        return this.props.cpf;
    }

    set cpf(value: CPF) {
        this.props.cpf = value;
    }

    static create(
        props: RawClientProps,
        id: Maybe<Number>,
    ): DomainErrorOr<Client> {
        const { cpf: rawCpf, email: rawEmail } = props;
        const cpfResult = CPF.create({ value: rawCpf });
        const emailResult = Email.create({ value: rawEmail });

        if (cpfResult.isFailure()) {
            return failure(cpfResult.value);
        }

        if (emailResult.isFailure()) {
            return failure(emailResult.value);
        }

        return success(
            new Client(
                {
                    ...props,
                    email: emailResult.value,
                    cpf: cpfResult.value,
                },
                id,
            ),
        );
    }

    public cpfMatch(cpf: String): Boolean {
        return this.cpf.value === cpf;
    }
}
