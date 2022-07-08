
const getRoutes: any = []
const postRoutes: any = []

import { Utils } from "../utils/utils"
const utils = new Utils()
export class Router {


    _registerRouter = (path, funct: any[]) => {
        let middlewares: any = []
        let controller 
        const len = funct.length

        if (len == 1) {
            middlewares = []
            controller = funct[0]
        }

        if(len >= 2) {
            middlewares = funct.slice(0, len -1)
            controller = funct[len - 1]
        }

        return {
            path: path,
            middlewares: middlewares,
            controller: controller,
        }

    }

    processRoute =  async (req, res, listRoutes) => {

        for( let route of listRoutes) {
            if (req.url === route.path) {
                if(route.middlewares.length === 1) {
                    route.middlewares[0](req, res, route.controller)
                } else if (route.middlewares.length === 0) {
                    route.controller(req, res)
                }
                break
            }
        }
    }

    get = (path, ...funct) => {
        let route: {path, middlewares, controller} = this._registerRouter(path, funct)
        getRoutes.push(route)
    }

    post = (path, ...funct) => {
        let route = this._registerRouter(path, funct)
        postRoutes.push(route)
    }

    runRouter = (req, res) => {
        let method = req.method
        let path = req.url
        console.log(method, path)
        if (method === "GET") {
            this.processRoute(req,res, getRoutes)
        } else if (method === "POST") {
            this.processRoute(req, res, postRoutes)
        }else if (method === "OPTIONS") {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            res.end();
        }
    
    }


}




