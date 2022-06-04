import { IProduct } from "../models/product";
import { BasicService } from "./basicService";

export class ProductService extends BasicService {
    createProduct(args: IProduct): Promise<IProduct> {
        return this.productDB.createProduct(args);
    }
    deleteProduct(args: { _id: string }): Promise<IProduct> {
        return this.productDB.deleteProduct(args);
    }
    updateProduct(args: { _id: string, data: any }): Promise<IProduct> {
        return this.productDB.updateProduct(args);
    }
    findProductById(args: { _id: string }): Promise<IProduct> {
        return this.productDB.findProductById(args);
    }
    findAllProducts(): Promise<IProduct[]> {
        return this.productDB.getAllProducts();
    }
}
