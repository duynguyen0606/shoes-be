import { UserController } from "../controllers/user";
import { Router } from "./Router";
import { Required } from "../middlewares/userRequired";

const router = new Router()
const controllers = new UserController()
const required = new Required()


router.get('/user/list', required.adminRequired, controllers.getAllUsers)
router.post('/user/create-admin', required.adminRequired, controllers.createAdmin)
router.post('/user/detail', required.adminRequired, controllers.getUser)
router.post('/user/delete', required.adminRequired, controllers.deleteUser)
router.post('/user/update-profile', controllers.updateProfile)
router.post('/login', controllers.login)
router.post('/register', controllers.createUser)
router.post('/user/change-password', controllers.changePassword)
router.get('/user/logout',controllers.logout)
router.post('/user/checkLogin', controllers.checkLogin)

export default router

