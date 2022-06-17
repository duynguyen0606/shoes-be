import { IVoucher } from "../models/voucher";
import { BasicService } from "./basicService";

export class VoucherService extends BasicService{
    async getAllVouchers(): Promise<IVoucher[]>{
        return this.voucherDB.getAllVouchers();
    }
    async getVoucherById(args: { id: string}): Promise<IVoucher>{
        return this.voucherDB.getVoucherById(args)
    }
    async updateVoucherById(args: { id: string, data: any}): Promise<IVoucher>{
        return this.voucherDB.updateVoucherById(args)
    }
    async deleteVoucherById(args: { id: string}): Promise<IVoucher>{
        return this.voucherDB.deleteVoucherById(args)
    }
    async createVoucher(args: {data: IVoucher}): Promise<IVoucher>{
        return this.voucherDB.createVoucher(args)
    }
}