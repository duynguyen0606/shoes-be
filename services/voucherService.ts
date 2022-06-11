import { IVoucher } from "../models/voucher";
import { BasicService } from "./basicService";

export class VoucherService extends BasicService{
    getAllVouchers(): Promise<IVoucher[]>{
        return this.voucherDB.getAllVouchers();
    }
    getVoucherById(args: { id: string}): Promise<IVoucher>{
        return this.voucherDB.getVoucherById(args)
    }
    updateVoucherById(args: { id: string, data: any}): Promise<IVoucher>{
        return this.voucherDB.updateVoucherById(args)
    }
    deleteVoucherById(args: { id: string}): Promise<IVoucher>{
        return this.voucherDB.deleteVoucherById(args)
    }
    createVoucher(args: {data: IVoucher}): Promise<IVoucher>{
        return this.voucherDB.createVoucher(args)
    }
}