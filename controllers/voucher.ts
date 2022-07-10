import { Utils } from "../utils/utils";
import { VoucherService } from "../services/voucherService";
import mongoose from "mongoose";
const utils = new Utils()
const voucherService = new VoucherService()


export class VoucherController {
    getAllVouchers = async (req, res) => {
        try {
            const checkLogin = req.headers['authorization']
            const vouchers = await voucherService.getAllVouchers();
            if (checkLogin === undefined) {
                return utils.responseUnauthor(res, 200, vouchers)
            }
            else return utils.sendRespond(res, utils.getAccessToken(req), 200, vouchers)
        } catch (error) {
            utils.responseUnauthor(res, 400, { error: error })
        }
    };

    getVoucher = async (req, res) => {
        try {
            let data = "";
            req.on("data", async (chunk) => {
                data += chunk.toString();
                const body: { id } = JSON.parse(data)
                const checkLogin = req.headers['authorization']

                if (!mongoose.isValidObjectId(body.id)) {
                    return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy voucher" })
                }

                let voucher = await voucherService.getVoucherById({ id: body.id })
                if (voucher._id === undefined) {
                    voucher = await voucherService.getVoucherById({ id: body.id })
                }

                if (checkLogin === undefined) {
                    if (voucher._id === undefined) {
                        return utils.responseUnauthor(res, 404, { message: "Không tìm thấy voucher" })
                    }
                    return utils.responseUnauthor(res, 200, voucher)
                }
                else {
                    if (voucher._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy voucher" })
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 200, voucher)
                }
            })


        } catch (error) {
            utils.responseUnauthor(res, 400, { error: error })
        }
    };


    createVoucher = async (req, res) => {
        try {
            let data = "";
            req.on("data", async (chunk) => {
                data += chunk.toString();
                const body: { discount, condition } = JSON.parse(data);
                let voucher = {
                    _id: undefined,
                    discount: body.discount,
                    condition: body.condition
                }
                const voucherCreated = await voucherService.createVoucher({ data: voucher })
                if (voucherCreated._id === undefined) {
                    return utils.sendRespond(res, utils.getAccessToken(req), 400, { message: "Tạo voucher không thành công" })
                }

                return utils.sendRespond(res, utils.getAccessToken(req), 200, voucherCreated)
            })

        } catch (error) {
            utils.responseUnauthor(res, 400, { error: error })
        }
    };

    deleteVoucher = async (req, res) => {
        try {
            let data = "";
            req.on("data", async (chunk) => {
                data += chunk.toString()
                const body: { id } = JSON.parse(data)
                let voucherDeleted = await voucherService.deleteVoucherById({ id: body.id });
                if (voucherDeleted._id === undefined) {
                    return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy voucher" })
                }
    
                return utils.sendRespond(res, utils.getAccessToken(req), 200, voucherDeleted)
            })
        } catch (error) {
            utils.responseUnauthor(res, 400, { error: error })
        }
    };

    updateVoucher = async (req, res) => {
        try {
            let data = "";
            req.on("data", async (chunk) => {
                data += JSON.parse(data)
                const body: { id, data } = JSON.parse(data)
                const voucherUpdated = await voucherService.updateVoucherById({ id: body.id, data: body.data })
                if (voucherUpdated._id === undefined) {
                    return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Cập nhật voucher không thành công" })
                }
                return utils.sendRespond(res, utils.getAccessToken(req), 200, voucherUpdated)
            })

        } catch (error) {
            utils.responseUnauthor(res, 400, { error: error })
        }
    };
}