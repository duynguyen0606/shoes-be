import { IOrder, OrderStatus } from '../models/order';
import { BasicService } from './basicService';
export class OrderService extends BasicService {
    getAllOrders(): Promise<IOrder[]> {
        return this.orderDB.getAllOrders();
    }
    getOrderById(args: {id: string}): Promise<IOrder> {
        return this.orderDB.getOrderById(args);
    }
    getOrderByStatus(args: {status: OrderStatus}): Promise<IOrder[]> {
        return this.orderDB.getOrderByStatus(args);
    }
    updateOrder(args: {id: string, data: IOrder}): Promise<IOrder> {
        return this.orderDB.updateOrder(args);
    }
    createOrder(args: {data: IOrder}): Promise<IOrder> {
        return this.orderDB.createOrder(args)
    }
}