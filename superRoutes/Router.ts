import http from "http"
import { get } from "mongoose"
import { UserController } from "../controllers/user"
import { ValidatorUser } from "../validators/validatorsUser"

const validatorsUser = new ValidatorUser()
const controller = new UserController()


const getRoutes = [{
    path: "",
    middlewares: () => {},
    controller: () => {}
}]
getRoutes.pop()
const postRoutes = {}
export class Router {


    get = (path, middlewares, controller) => {

        // if(controller === undefined) {
        //     controller = middlewares
        //     middlewares = []
        // }

        // if(!Array.isArray(middlewares)) {
        //     middlewares = [middlewares]
        // }
        // for (let route of getRoutes) {
        //     if(route.path === path) {
        //         route.middlewares()
        //     }
        // }
        console.log(path)
        console.log(controller)
    }


}

const router = new Router()

