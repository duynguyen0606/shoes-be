
import http from "http";
import connectDatabase from "./utils/mongodb";
import { Router} from "./routes/Router";
import routerUser from "./routes/routesUser"
import routerProduct from "./routes/routesProduct"
import routerOrder from "./routes/routesOrder"
import routerVoucher from "./routes/routesVoucher"
import routerComment from "./routes/routesComment"
import { Required } from "./middlewares/userRequired";
import { Utils } from "./utils/utils";
import * as dotenv from 'dotenv';
dotenv.config();
routerUser; routerOrder; routerProduct; routerVoucher; routerComment;

const router = new Router()
const required = new Required()
const port = process.env.PORT ;
const utils = new Utils()

const pathUnthorize = [
    '/login', 
    '/register', 
    '/product/list', 
    '/product/detail',
    '/voucher/list',
    '/voucher/detail',
    '/comments',
    '/comment/reply',
    '/comment/post'
]

const server = http.createServer(async (req, res) => {
    if (pathUnthorize.find((path) => { return path === req.url})) {
        router.runRouter(req, res)
    }
    else {
        required.authenticate(req, res, router.runRouter)
    }

})

connectDatabase();

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})




