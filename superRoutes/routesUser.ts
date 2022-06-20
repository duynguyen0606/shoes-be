import { UserController } from "../controllers/user";
import { Router } from "./Router";
import http from "http"
const router = new Router()
const controllers = new UserController()

// router.get("/user/create-admin",)

export default router