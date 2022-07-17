import { IOrder, OrderStatus } from "../../models/order";

export interface IOrderDb {
    getAllOrders(): Promise<IOrder[]>;
    getOrderById(args: {id: string}): Promise<IOrder>;
    getOrderByStatus(args: {status: OrderStatus}): Promise<IOrder[]>;
    updateOrder(args: {id: string, data: any}): Promise<IOrder>;
    createOrder(args: {data: any}): Promise<IOrder>;
    getOrderByIdUser(args: {id: string}): Promise<IOrder[]>;
} 