import { IProductDb } from '../database/interface/product.interface';
import { ProductDb } from '../database/mongo/product';
import { UserDb } from '../database/mongo/user';
import { IUserDb } from './../database/interface/user.interface';
export class BasicService {
    protected readonly userDB: IUserDb = new UserDb();
    protected readonly productDB: IProductDb = new ProductDb();
}