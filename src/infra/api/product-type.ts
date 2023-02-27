export interface ProductType {
    id: Number;
    createdAt: Date;
    updatedAt: Date;
    name: String;
    sensorTypeItem: { id: Number };
}
