import jwt from "jsonwebtoken"
import { ObjectId } from "mongoose";
import { Role } from "../models/user";
import jwtDecode from "jwt-decode";
import { TOKEN_SECRET } from "./config";

export const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Max-Age": 30*60*60*24, // 30 days
    /** add other headers as per requirement */
};

export class Utils {

    generateAccessToken = (currentUser: {
        id: ObjectId | undefined,
        name: string,
        email: string,
        address: string | undefined,
        phoneNumber: string | undefined,
        role: Role
    }) => {
        // expires after 7 days = 7 * 60 * 60 * 24
        return jwt.sign({ currentUser }, TOKEN_SECRET, { expiresIn: 7*60*60*24});
    }

    sendRespond =  (res, accessToken , statusCode, data) => {
        res.setHeader("Authorization", `Bearer ${accessToken}`)
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode, headers)
        res.write(JSON.stringify(data))
        res.end("\n")
    }

    responseUnauthor = (res, statusCode, data) => {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode, headers)
        res.write(JSON.stringify(data))
        res.end("\n")
    }

    requestUser =  async (req) => {
        const token = req.headers['authorization'].split(" ")[1]
        let data:{currentUser}= jwtDecode(token)
        return data.currentUser
    }

    getAccessToken = (req)  => {
        return req.headers['authorization'].split(" ")[1]
    }


}



