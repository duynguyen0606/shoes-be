import { IVoucher } from "../../models/voucher";

export interface IVoucherDb {
    getAllVouchers(): Promise<IVoucher[]>;
    getVoucherById(args: {id: string}): Promise<IVoucher>;
    updateVoucherById(args: {id: string, data: any}): Promise<IVoucher>;
    deleteVoucherById(args: {id: string}): Promise<IVoucher>;
    createVoucher(args: {data: IVoucher}): Promise<IVoucher>;
}