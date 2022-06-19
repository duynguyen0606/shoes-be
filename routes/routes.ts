import { UserController } from "../controllers/user";
import routesOrder from "./routesOrder";
import routesProduct from "./routesProduct";
import routesUser from "./routesUser";
import routesVoucher from "./routesVoucher";
import { ProductController } from "../controllers/product";
const controller = new ProductController()

export const routes = {
    login: async (req, res) => {
        let path = req.url?.replace(/^\/+|\/+$/g, "");
        let method = req.method
        let route = typeof routesUser[method][path] !== "undefined" ? routesUser[method][path] : routesUser["notFound"];
        route(req, res);
    },
    register: async (req, res) => {
        let path = req.url?.replace(/^\/+|\/+$/g, "");
        let method = req.method
        let route =
            typeof routesUser[method][path] !== "undefined" ? routesUser[method][path] : routesUser["notFound"];
        route(req, res);
    },
    product: async (req, res) => {
        let path = req.url?.replace(/^\/+|\/+$/g, "");
        let method = req.method
        let route =
            typeof routesProduct[method][path] !== "undefined" ? routesProduct[method][path] : routesProduct["notFound"];
        route(req, res);
    },
    order: (req, res) => {
        let path = req.url?.replace(/^\/+|\/+$/g, "");
        let method = req.method
        let route =
            typeof routesOrder[method][path] !== "undefined" ? routesOrder[method][path] : routesOrder["notFound"];
        route(req, res);
    },
    user: (req, res) => {
        let path = req.url?.replace(/^\/+|\/+$/g, "");
        let method = req.method
        let route =
            typeof routesUser[method][path] !== "undefined" ? routesUser[method][path] : routesUser["notFound"];
        route(req, res);
    },
    voucher: (req, res) => {
        let path = req.url?.replace(/^\/+|\/+$/g, "");
        let method = req.method
        let route =
            typeof routesVoucher[method][path] !== "undefined" ? routesVoucher[method][path] : routesVoucher["notFound"];
        route(req, res);
    },
    notFound: () => {

    }
}

