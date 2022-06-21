import { Utils } from "../utils/utils";
import { VoucherService } from "../services/voucherService";
import mongoose from "mongoose";
const utils = new Utils()
const voucherService = new VoucherService()


export class VoucherController {
    getAllVouchers = async (req, res) => {
        try {
            const vouchers = await voucherService.getAllVouchers();
            utils.responseUnauthor(res, 200, vouchers)
        } catch (error) {
            console.log(error)
        }
    };

    getVoucher = async (req, res) => {
        try {
            const body: {id} = await utils.getPostData(req)

            if(!mongoose.isValidObjectId(body.id)) {
                return utils.sendRespond(res, utils.getAccessToken(req),404, {message: "Không tìm thấy voucher"})
            }

            let voucher = await voucherService.getVoucherById({id: body.id})
            if(voucher._id === undefined) {
                voucher = await voucherService.getVoucherById({id: body.id})
            }

            if (voucher._id === undefined) {
                return utils.responseUnauthor(res, 404, {message: "Không tìm thấy voucher"})
            }
            return utils.responseUnauthor(res, 200, voucher)

        } catch (error) {
            console.log(error)
        }
    };


    createVoucher = async (req, res) => {
        try {
            const body: {discount, condition} = await utils.getPostData(req)
            let voucher = {
                _id:  undefined,
                discount: body.discount,
                condition: body.condition
            }
            const voucherCreated = await voucherService.createVoucher({data: voucher})
            if(voucherCreated._id === undefined) {
                return utils.sendRespond(res, utils.getAccessToken(req), 400, {message: "Tạo voucher không thành công"})
            }
    
            return utils.sendRespond(res, utils.getAccessToken(req), 200, voucherCreated)
        } catch (error) {
            
        }
    };

    deleteVoucher = async (req, res) => {
        try {
            const body: {id} = await utils.getPostData(req)
            let voucherDeleted = await voucherService.deleteVoucherById({id: body.id});
            if (voucherDeleted._id === undefined) {
                return utils.sendRespond(res, utils.getAccessToken(req), 404, {message: "Không tìm thấy voucher"})
            }

            return utils.sendRespond(res, utils.getAccessToken(req), 200, voucherDeleted)

        } catch (error) {
            
        }
    };

    updateVoucher = async (req, res) => {
        try {
            const body: {id, data} = await utils.getPostData(req);
            const voucherUpdated = await voucherService.updateVoucherById({id: body.id, data: body.data})
            if (voucherUpdated._id === undefined) {
                return utils.sendRespond(res, utils.getAccessToken(req), 404, {message: "Cập nhật voucher không thành công"})
            }
            return utils.sendRespond(res, utils.getAccessToken(req), 200, voucherUpdated)

        } catch (error) {
            
        }
    };
}