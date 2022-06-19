import mongoose, { model, Model, Schema } from "mongoose";
import { IOrder, OrderInfo, OrderStatus } from "../../models/order";
import { IOrderDb } from "../interface/order.interface";
import { productTable } from "./product";
import { userTable } from "./user";

export interface IOrderDocument extends IOrder, Document {
    _id: any
}
interface IOrderSchema extends Model<IOrderDocument> {

}
const orderTable = "Order";

const orderSchema = new Schema<IOrderDocument, IOrderSchema>({
    products: [{
        type: mongoose.Types.ObjectId,
        ref: productTable
    }],
    totalPrice: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: userTable
    },
    address: String,
    phoneNumber: String,
    status: Number
});
export const orderModel = model(orderTable, orderSchema);

export class OrderDb implements IOrderDb {
    async getAllOrders(): Promise<IOrder[]> {
        return await orderModel.find();
    }
    async getOrderById(args: { id: string; }): Promise<IOrder> {
        const order = await orderModel.findById(args.id);
        return new OrderInfo(order);
    }
    async getOrderByStatus(args: { status: OrderStatus }): Promise<IOrder[]> {
        return await orderModel.find({status: args.status});
    }
    async updateOrder(args: { id: string; data: any; }): Promise<IOrder> {
        return new OrderInfo(await orderModel.findByIdAndUpdate(args.id, args.data, { new: true }))
    }
    async createOrder(args: { data: IOrder; }): Promise<IOrder> {
        return new OrderInfo(await orderModel.create(args.data));
    }
    
}