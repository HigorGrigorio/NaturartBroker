import { ProductType } from '@infra/api/product-type';

export interface Product {
    id: Number;
    serialCode: String;
    name: String;
    idInvoiceItem: Number;
    createdAt: Date;
    updatedAt: Date;
    types: Array<ProductType>;
}
