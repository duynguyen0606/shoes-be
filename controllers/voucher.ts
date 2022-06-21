import { Utils } from "../utils/utils";
import { VoucherService } from "../services/voucherService";

const utils = new Utils()
const voucherService = new VoucherService()


export class VoucherController {
    getAllVouchers = async (req, res) => {
        try {
            const products = await voucherService.getAllVouchers();
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200)
            res.write(JSON.stringify(products))
            res.end("\n")
        } catch (error) {
            console.log(error)
        }
    };

    getVoucher = async (req, res) => {

    };


    createVoucher = async (req, res) => {

    };

    deleteVoucher = async (req, res) => {

    };

    updateVoucher = async (req, res) => {

    };
}