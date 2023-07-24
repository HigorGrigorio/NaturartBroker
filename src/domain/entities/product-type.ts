import { DomainErrorOr } from '@core/domain/domain-error-or';
import { Maybe, success } from '@core/logic';
import { randomInt } from 'crypto';
import { Product } from '@domain/entities/product';
import { ProductTypeItem } from './product-type-item';

export interface ProductTypeProps {
    name: String;
}

export class ProductType {
    private readonly _id: Number;
    private _items: Array<ProductTypeItem> = [];

    private constructor(private props: ProductTypeProps, id: Maybe<Number>) {
        this._id = id ?? randomInt(9999999);
    }

    private _products: Array<Product> = [];

    get products(): Readonly<Array<Product>> {
        return this._products;
    }

    public get id(): Number {
        return this._id;
    }

    public get name(): String {
        return this.props.name;
    }

    public set name(value: String) {
        this.props.name = value;
    }

    public static create(
        props: ProductTypeProps,
        id: Maybe<Number>,
    ): DomainErrorOr<ProductType> {
        return success(new ProductType(props, id));
    }

    public addProduct(product: Product, idItem: Maybe<Number>): void {
        if (this._products.some((item) => item.id === product.id)) {
            return;
        }

        const item = new ProductTypeItem(
            {
                idProduct: product.id,
                idType: this._id,
            },
            idItem,
        );

        this._items.push(item);
        this._products.push(product);
        product.addType(this, idItem);
    }

    public removeProduct(product: Product): void {
        if (!this._products.includes(product)) {
            return;
        }

        const lastIndex = this._items.length;

        this._items = this._items.filter(
            (item) => item.idProduct !== product.id,
        );
        this._products = this.products.filter((item) => item.id !== product.id);

        if (lastIndex > this._items.length) {
            product.removeType(this);
        }
    }
}
