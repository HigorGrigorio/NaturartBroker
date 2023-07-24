import { Maybe } from '@core/logic';
import { randomInt } from 'crypto';

interface ProductTypeItemProps {
    idProduct: Number;
    idType: Number;
}

export class ProductTypeItem {
    constructor(private props: ProductTypeItemProps, id: Maybe<Number>) {
        this._id = id ?? randomInt(9999999);
    }

    private _id: Number;

    get id(): Number {
        return this._id;
    }

    get idProduct(): Number {
        return this.props.idProduct;
    }

    set idProduct(value: Number) {
        this.props.idProduct = value;
    }

    get idType(): Number {
        return this.props.idType;
    }

    set idType(value: Number) {
        this.props.idType = value;
    }
}
