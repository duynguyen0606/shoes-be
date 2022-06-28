
import http from "http";
import passport from "passport";
import connectDatabase from "./utils/mongodb";
import { routes } from "./routes/routes";
import { Utils } from "./utils/utils";
import * as dotenv from 'dotenv';
dotenv.config();

const utils = new Utils()
const port = process.env.PORT ;

const server = http.createServer(async (req, res) => {
    req.on("data", () => {})
    let path = req.url?.replace(/^\/+|\/+$/g, "");
    let route = typeof routes[`${path?.split("/")[0]}`] !== "undefined" ? routes[`${path?.split("/")[0]}`] : routes["notFound"];
    route(req, res);
})

connectDatabase();

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

