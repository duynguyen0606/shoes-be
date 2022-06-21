import http from "http"
import { Utils } from "../utils/utils"

const utils = new Utils()

export default (req, res) => {
    const errors = []

    if(!errors) {
        return utils.sendRespond(res, utils.getAccessToken(req), 400, {errors: errors})
    }

    
}