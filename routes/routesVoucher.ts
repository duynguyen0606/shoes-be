import { VoucherController } from "../controllers/voucher";
import { Router } from "./Router";
import { Required } from "../middlewares/userRequired";

const router = new Router()
const controllers = new VoucherController()
const required = new Required()


router.get('/voucher/list', controllers.getAllVouchers)
router.post('/voucher/detail', controllers.getVoucher)
router.post('/voucher/delete', required.adminRequired, controllers.deleteVoucher)
router.post('/voucher/update', required.adminRequired, controllers.updateVoucher)
router.post('/voucher/create-voucher', required.adminRequired, controllers.createVoucher)


export default router