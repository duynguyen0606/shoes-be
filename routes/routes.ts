import { UserController } from "../controllers/user";
import routesOrder from "./routesOrder";
import routesProduct from "./routesProduct";
import routesUser from "./routesUser";
import routesVoucher from "./routesVoucher";
import { ProductController } from "../controllers/product";
import { Utils } from "../utils/utils";

const controller = new ProductController()
const utils = new Utils()

export const routes = {
    login: (req, res) => { utils.routing(req, res, routesUser) },
    register: (req, res) => { utils.routing(req, res, routesUser) },
    product: (req, res) => { utils.routing(req, res, routesProduct) },
    order: (req, res) => { utils.routing(req, res, routesOrder) },
    user: (req, res) => { utils.routing(req, res, routesUser) },
    voucher: (req, res) => { utils.routing(req, res, routesVoucher) },
    notFound: (req, res) => { res.end({ message: "Not found", status: 404 }) }
}

