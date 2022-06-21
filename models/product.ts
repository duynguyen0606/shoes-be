export interface IProduct {
    _id: string | undefined;
    name: string;
    price: number;
    color?: string;
    size?: number;
    amount: number;
    linkImg: string[];
}

export class ProductInfor {
    _id: string | undefined;
    name: string;
    price: number;
    color?: string;
    size?: number;
    amount: number;
    linkImg: string[];
    constructor(args?: any){
        this._id = args?._id?? undefined;
        this.name = args?.name?? "";
        this.amount = args?.amount?? 0;
        this.color = args?.color?? "";
        this.size = args?.size?? 0;
        this.price = args?.price?? 0;
        this.linkImg = args?.linkImg?? [];
    }
}