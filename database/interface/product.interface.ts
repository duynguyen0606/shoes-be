import { IProduct } from "../../models/product";

export interface IProductDb {
    getAllProducts(): Promise<IProduct[]>;
    findProductById(agrs: { _id: string }): Promise<IProduct>;
    createProduct(agrs: IProduct): Promise<IProduct>;
    updateProduct(agrs: { _id: string, data: any }): Promise<IProduct>;
    deleteProduct(agrs: { _id: string }): Promise<IProduct>;
}