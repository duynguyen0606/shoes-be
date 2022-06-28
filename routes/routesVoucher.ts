import { VoucherController } from "../controllers/voucher"
import { ValidatorVoucher } from "../validators/validatorsVoucher";
const controllers = new VoucherController()

const routesVoucher = {
    GET: {
        "voucher/list": async (req, res) => {
            await controllers.getAllVouchers(req, res);
        }

    },
    POST: {
        "voucher/create-voucher": async (req, res) => {
            await controllers.createVoucher(req, res);
        },
        "voucher/update": async (req, res) => {
            await controllers.updateVoucher(req, res)
        },
        "voucher/delete": async (req, res) => {
            await controllers.deleteVoucher(req, res);
        },
        "voucher/detail": async (req, res) => {
            await controllers.getVoucher(req, res);
        }
    },
    notFound: (req, res) => { res.end({ message: "Not found", status: 404 }) }
}

export default routesVoucher