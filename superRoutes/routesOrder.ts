import { OrderController } from "../controllers/order";
import { Router } from "./Router";
import { Required } from "../middlewares/userRequired";


const router = new Router()
const controllers = new OrderController()
const required = new Required()

router.get('/order/list', controllers.getAllOrders)
router.post('/order/detail', controllers.getOrder)
router.post('/order/create-order', controllers.createOrder)
router.post('/order/status', controllers.getOrderbyStatus)
router.post('/order/update', required.userRequired, controllers.updateOrder)

export default router