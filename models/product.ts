export interface IProduct {
    _id?: string | undefined;
    name: string;
    price: number;
    color?: string;
    size?: IProductSize[];
    linkImg: string[];
    category?: number[],
}
export interface IProductSize{
    size: number;
    amount: number;
}
export enum Category {
    MALE,
    FEMALE,
    SPORT,
    LEATHER,
    RUNNING
}

export class ProductInfor {
    _id?: string | undefined;
    name: string;
    price: number;
    color?: string;
    size?: IProductSize[];
    linkImg: string[];
    category?: number[];
    constructor(args?: any){
        this._id = args?._id?? undefined;
        this.name = args?.name?? "";
        this.color = args?.color?? "";
        this.size = args?.size?? [];
        this.price = args?.price?? 0;
        this.linkImg = args?.linkImg?? [];
        this.category = args?.category?? [];
    }
}