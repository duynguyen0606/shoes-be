import { OrderController } from "../controllers/order"
const controllers = new OrderController()

const routesOrder = {
    GET: {
        "order/list": async (req, res) => {
            await controllers.getAllOrders( req, res);
        }
    },
    POST: {
        "order/detail": async (req, res) => {
            await controllers.getOrder(req, res);
        },
        "order/status": async (req, res) => {
            await controllers.getOrderbyStatus(req, res);
        },
        "order/update": async (req, res) => {
            await controllers.updateOrder(req, res);
        },
        "order/create-order": async (req, res) => {
            await controllers.createOrder(req, res)
        }
    },
    notFound: (req, res) => { res.end({ message: "Not found", status: 404 }) }
}

export default routesOrder