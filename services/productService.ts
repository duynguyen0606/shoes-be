import { IProduct } from "../models/product";
import { BasicService } from "./basicService";

export class ProductService extends BasicService {
    async createProduct(args: IProduct): Promise<IProduct> {
        return this.productDB.createProduct(args);
    }
    async deleteProduct(args: { _id: string }): Promise<IProduct> {
        return this.productDB.deleteProduct(args);
    }
    async updateProduct(args: { _id: string, data: any }): Promise<IProduct> {
        return this.productDB.updateProduct(args);
    }
    async findProductById(args: { _id: string }): Promise<IProduct> {
        return this.productDB.findProductById(args);
    }
    async findAllProducts(): Promise<IProduct[]> {
        return this.productDB.getAllProducts();
    }
}
