import { IProduct } from "./product";

export interface IOrder {
    _id?: string | undefined;
    products: IProduct[];
    totalPrice: number;
    userId: string | undefined;
    address: string;
    phoneNumber: string;
    status: OrderStatus;
    createdAt?: string;
    updatedAt?: string;
    size: number[];
    amount: number[];
}

export enum OrderStatus {
    pending,
    cancelled,
    success,
    delivering

}
 export class OrderInfo {
    _id?: string | undefined;
    products: IProduct[];
    totalPrice: number;
    userId: string | undefined;
    address: string;
    phoneNumber: string;
    status: OrderStatus;
    createdAt?: string;
    updatedAt?: string;
    size: number[];
    amount: number[];
    constructor(arg?: any){
        this._id = arg?._id?? undefined;
        this.products = arg?.products?? [];
        this.totalPrice = arg?.totalPrice?? 0;
        this.userId = arg?.userId ?? undefined;
        this.address = arg?.address ?? "";
        this.phoneNumber = arg?.phoneNumber ?? "";
        this.status = arg?.status ?? OrderStatus.pending;
        this.createdAt = arg?.createdAt ?? "";
        this.updatedAt = arg?.updatedAt ?? "";
        this.size = arg?.size ?? [];
        this.amount = arg?.amount ?? [];
    }
}