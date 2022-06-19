import { Schema, model } from 'mongoose';
import { Model } from 'mongoose';
import { IVoucher, VoucherInfo } from "../../models/voucher";
import { IVoucherDb } from '../interface/voucher.interface';

export interface IVoucherDocument extends IVoucher, Document {
    _id: any
}
interface IVoucherSchema extends Model<IVoucherDocument> {

}
export const voucherTable = "Voucher";
const voucherSchema = new Schema<IVoucherDocument, IVoucherSchema>({
    discount:{
        type: Number,
        default: 0
    },
    condition: {
        type: Number,
        default: 0
    }
});

export const voucherModel = model(voucherTable, voucherSchema);

export class VoucherDb implements IVoucherDb {
    async getAllVouchers(): Promise<IVoucher[]> {
        return await voucherModel.find();
    }
    async getVoucherById(args: { id: string; }): Promise<IVoucher> {
        const voucher = await voucherModel.findById(args.id);
        return new VoucherInfo(voucher);
    }
    async updateVoucherById(args: { id: string; data: any; }): Promise<IVoucher> {
        const voucher = await voucherModel.findByIdAndUpdate(args.id, args.data, { new: true });
        return new VoucherInfo(voucher);
    }
    async deleteVoucherById(args: { id: string; }): Promise<IVoucher> {
        const voucher = await voucherModel.findByIdAndDelete(args.id);
        return new VoucherInfo(voucher);
    }
    async createVoucher(args: { data: IVoucher; }): Promise<IVoucher> {
        const voucher = await voucherModel.create(args.data);
        return new VoucherInfo(voucher);
    }

}