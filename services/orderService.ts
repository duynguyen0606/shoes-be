import { IOrder, OrderStatus } from "../models/order";
import { BasicService } from "./basicService";
export class OrderService extends BasicService {
  async getAllOrders(): Promise<IOrder[]> {
    return this.orderDB.getAllOrders();
  }
  async getOrderById(args: { id: string }): Promise<IOrder> {
    return this.orderDB.getOrderById(args);
  }
  async getOrderByStatus(args: { status: OrderStatus }): Promise<IOrder[]> {
    return this.orderDB.getOrderByStatus(args);
  }
  async updateOrder(args: { id: string; data: any }): Promise<IOrder> {
    return this.orderDB.updateOrder(args);
  }
  async createOrder(args: { data: any }): Promise<IOrder> {
    return this.orderDB.createOrder(args);
  }
  async getOrderByIdUser(args: { id: string }): Promise<IOrder[]> {
    return this.orderDB.getOrderByIdUser(args);
  }
}
