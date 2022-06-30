import jwtDecode from "jwt-decode";
import { Utils } from "../utils/utils"
const utils = new Utils()
export class Required {

    userRequired = async (req, res, next) => {
        const token = req.headers['authorization'].split(" ")[1]
        let data:{currentUser}= jwtDecode(token)
        if (data.currentUser["role"] === 0) {
            return next(req, res)
        }
        let err = {
            message: "Permission Denied",
            status: 403
        }
        return utils.sendRespond(res, utils.getAccessToken(req), 403, err)
    }

    adminRequired = async (req, res, next) => {

        const token = req.headers['authorization'].split(" ")[1]
        let data:{currentUser}= jwtDecode(token)

        if (data.currentUser["role"] === 1) {
            return next(req, res)
        }
        
        let err = {
            message: "Permission Denied",
            status: 403
        }
        return utils.sendRespond(res, utils.getAccessToken(req), 403, err)
    }

    authenticate =  async (req, res, next) => {

        let err = {
            message: "Hãy đăng nhập để  thực hiện chức năng này",
            status: 403
        }

        if (req.headers['authorization'] === undefined) {
            return utils.responseUnauthor(res, 403, err)
        }

        const token = req.headers['authorization'].split(" ")[1]
        const data: { currentUser, iat, exp } = jwtDecode(token)


        if (Date.now() <= data.exp * 1000) {
            return next(req, res)
        } else {
            return utils.responseUnauthor(res, 403, err)
        }



    }
}