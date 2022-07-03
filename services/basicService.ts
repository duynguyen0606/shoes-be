import { ICommentDb } from '../database/interface/comment.interface';
import { IOrderDb } from '../database/interface/order.interface';
import { IProductDb } from '../database/interface/product.interface';
import { IVoucherDb } from '../database/interface/voucher.interface';
import { CommentDb } from '../database/mongo/comment';
import { OrderDb } from '../database/mongo/order';
import { ProductDb } from '../database/mongo/product';
import { UserDb } from '../database/mongo/user';
import { VoucherDb } from '../database/mongo/voucher';
import { IUserDb } from './../database/interface/user.interface';
export class BasicService {
    protected readonly userDB: IUserDb = new UserDb();
    protected readonly productDB: IProductDb = new ProductDb();
    protected readonly orderDB: IOrderDb = new OrderDb();
    protected readonly voucherDB: IVoucherDb = new VoucherDb();
    protected readonly commentDB: ICommentDb = new CommentDb();
}