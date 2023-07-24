import { Maybe } from '@core/logic';
import { randomInt } from 'crypto';

export interface MeasureProps {
    measure: String;
    idSensorTypeProduct: String;
    measurementDate: Date;
}

export class Measure {
    private constructor(
        private readonly props: MeasureProps,
        id: Maybe<Number>,
    ) {
        this._id = id ?? randomInt(9999999);
    }

    private _id: Number;

    get id(): Number {
        return this._id;
    }

    get measure(): String {
        return this.props.measure;
    }

    set measure(value: String) {
        this.props.measure = value;
    }

    get idSensorTypeProduct(): String {
        return this.props.idSensorTypeProduct;
    }

    set idSensorTypeProduct(value: String) {
        this.props.idSensorTypeProduct = value;
    }

    get measurementDate(): Date {
        return this.props.measurementDate;
    }

    public static create(props: MeasureProps, id: Maybe<Number>): Measure {
        return new Measure(props, id);
    }
}
