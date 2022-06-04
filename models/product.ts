export interface IProduct {
    _id: string | undefined;
    name: string;
    price: number;
    color?: string;
    size?: Size;
    amount: number;
}
export enum Size {
    size_m = 0,
    size_l = 1,
    size_xl = 2,
}
export class ProductInfor {
    _id: string | undefined;
    name: string;
    price: number;
    color?: string;
    size?: Size;
    amount: number;
    constructor(args?: any){
        this._id = args.id?? undefined;
        this.name = args.name?? "";
        this.amount = args.amount?? 0;
        this.color = args.color?? "";
        this.size = args.size?? 0;
        this.price = args.price?? 0;
    }
}