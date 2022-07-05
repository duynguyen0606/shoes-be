import jwtDecode from "jwt-decode";
import { Utils } from "../utils/utils"
import { UserService } from "../services/userService";

const utils = new Utils()
const userService = new UserService()

export class Required {

    userRequired = (req, res, next) => {
        const token = req.headers['authorization'].split(" ")[1]
        let data: { currentUser } = jwtDecode(token)
        if (data.currentUser["role"] === 0) {
            return next(req, res)
        }
        let err = {
            message: "Permission Denied",
            status: 403
        }
        return utils.sendRespond(res, utils.getAccessToken(req), 403, err)
    }

    adminRequired = (req, res, next) => {

        const token = req.headers['authorization'].split(" ")[1]
        let data: { currentUser } = jwtDecode(token)

        if (data.currentUser["role"] === 1) {
            return next(req, res)
        }

        let err = {
            message: "Permission Denied",
            status: 403
        }
        return utils.sendRespond(res, utils.getAccessToken(req), 403, err)
    }

    authenticate = async (req, res, next) => {

        let err = {
            message: "Hãy đăng nhập để  thực hiện chức năng này",
            status: 403
        }

        if (req.headers['authorization'] === undefined) {
            return utils.responseUnauthor(res, 401, {
                message: "Hãy đăng nhập để  thực hiện chức năng này",
                status: 401
            })
        }


        const token = req.headers['authorization'].split(" ")[1]
        const body: { currentUser, iat, exp } = jwtDecode(token)

        userService.findUserByEmail({ email: body.currentUser.email }).then((result) => {
            if (result._id === undefined) {
                utils.responseUnauthor(res, 401, err)
            }
        })

        if (Date.now() <= body.exp * 1000) {
            return next(req, res)
        } else {
            return utils.responseUnauthor(res, 403, err)
        }

    }
}