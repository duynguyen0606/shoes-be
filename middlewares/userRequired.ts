import http from "http"
import { Utils } from "../utils/utils"

const utils = new Utils()

export class Required {
    
    userRequired = async (req, res) => {

    }

    adminRequired = async (req, res) => {
        const user =  await utils.requestUser(req);
        if (user["role"] === 1) {
            return 
        }
        let err = {
            message: "Permission Denied",
            status: 403
        }
        return utils.sendRespond(res, utils.getAccessToken(req), 403, err)
    }
}