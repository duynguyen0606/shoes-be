export interface IVoucher {
    _id?: string | undefined;
    discount: number;
    condition: number;
}
export class VoucherInfo {
    _id?: string | undefined;
    discount: number;
    condition: number;
    constructor(args?: any){
        this._id = args?._id?? undefined;
        this.discount = args?.discount ?? 0;
        this.condition = args?.condition ?? 0;
    }
}
