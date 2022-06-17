import { IOrder, OrderStatus } from '../models/order';
import { BasicService } from './basicService';
export class OrderService extends BasicService {
    async getAllOrders(): Promise<IOrder[]> {
        return this.orderDB.getAllOrders();
    }
    async getOrderById(args: {id: string}): Promise<IOrder> {
        return this.orderDB.getOrderById(args);
    }
    async getOrderByStatus(args: {status: OrderStatus}): Promise<IOrder[]> {
        return this.orderDB.getOrderByStatus(args);
    }
    async updateOrder(args: {id: string, data: IOrder}): Promise<IOrder> {
        return this.orderDB.updateOrder(args);
    }
    async createOrder(args: {data: IOrder}): Promise<IOrder> {
        return this.orderDB.createOrder(args)
    }
}