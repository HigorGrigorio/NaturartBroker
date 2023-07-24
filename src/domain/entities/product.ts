import { DomainErrorOr } from '@core/domain/domain-error-or';
import { Maybe, success } from '@core/logic';
import { randomInt } from 'crypto';
import { ProductType } from './product-type';
import { ProductTypeItem } from './product-type-item';

export interface ProductProps {
    serialCode: String;
}

export class Product {
    private readonly _id: Number;

    private constructor(private props: ProductProps, id: Maybe<Number>) {
        this._id = id ?? randomInt(99999999);
    }

    private _items: Array<ProductTypeItem> = [];

    get items(): Readonly<Array<ProductTypeItem>> {
        return this._items;
    }

    private _types: Array<ProductType> = [];

    get types(): Readonly<Array<ProductType>> {
        return this._types;
    }

    public get id(): Number {
        return this._id;
    }

    public get serialCode(): String {
        return this.props.serialCode;
    }

    public set serialCode(value: String) {
        this.serialCode = value;
    }

    public static create(
        props: ProductProps,
        id: Maybe<Number>,
    ): DomainErrorOr<Product> {
        return success(new Product(props, id));
    }

    public addType(type: ProductType, idItem: Maybe<Number>): void {
        if (this._types.some((item) => item.id === type.id)) {
            return;
        }

        const item = new ProductTypeItem(
            {
                idProduct: this._id,
                idType: type.id,
            },
            idItem,
        );

        this._types.push(type);
        this._items.push(item);
        type.addProduct(this, idItem);
    }

    public removeType(type: ProductType): void {
        if (!this._types.includes(type)) {
            return;
        }

        const lastIndex = this._items.length;

        this._types = this.types.filter((item) => item.id !== type.id);
        this._items = this._items.filter((item) => item.idType !== type.id);

        if (lastIndex > this._items.length) {
            type.removeProduct(this);
        }
    }
}
