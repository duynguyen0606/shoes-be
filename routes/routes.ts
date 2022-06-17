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



// const router = new Router();


// class Router {
//     let getRoutes = [];

//     _processRequest(method, ) => {

//         if (method == get) this.get...Router.
//     }

//     get(route, middlewares, controller) {
//         if (controller is undefined) {
//             controller = middleares;
//             middlesre = [];
//         }

//         if (middleware is not array) {
//             middleware = [middleware];
//         }


//         this.getRoutes.push({
//             route: router,
//             middleware: middlware,
//             controller: controller;
//         });
//     }


// }


// router.get('/user/login', controller.userLogin)


// export class Router {

//     getRoutes: Array<{}> = [];
//     postRoutes: Array<{}> = [];

//     _registerRoute = (routeList, path) => {

//         if (controller === undefined) {
//             controller = middlewares;
//             middlewares = [];
//         }

//         if (!Array.isArray(middlewares)) {
//             middlewares = [middlewares];
//         }

//         getRoutes.push({
//             path: path,
//             middlewares: middlewares,
//             controller: controller
//         })

//         for(let middleware in middlewares) {
//             middleware
//         }
//     }

//     get = (path, middlewares, controller) => {
//         _registerRoute(getRoutes, path, middlewares, controller)

//     }

//     post = (path, middlewares, controller) => {
//         _registerRoute(postRoutes, path, middlewares, controller)
//     }
// }

// const router = new Router()

// router.get('/product/list', loginRequired, async (req, res) => {

// })