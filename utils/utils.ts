import jwt from "jsonwebtoken"
import { ObjectId } from "mongoose";
import { Role } from "../models/user";
import jwtDecode from "jwt-decode";
import { TOKEN_SECRET } from "./config";


export class Utils {

    getPostData = async (req) => {
        try {
            let body = "";
            await req.on("data", (chunk) => {
                body += chunk.toString();
            })
            return JSON.parse(body)
        } catch (error) {
            console.log(error)
        }
    }

    generateAccessToken = (currentUser: {
        id: ObjectId | undefined,
        name: string,
        email: string,
        address: string | undefined,
        phoneNumber: string | undefined,
        role: Role
    }) => {
        // expires after 7 days
        return jwt.sign({ currentUser }, TOKEN_SECRET, { expiresIn: 7 * 60 * 60 * 24 });
    }

    sendRespond = async (res, accessToken, statusCode, data) => {
        res.setHeader("Authorization", `Bearer ${accessToken}`)
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode)
        res.write(JSON.stringify(data))
        res.end("\n")
    }

    requestUser = async (req) => {
        const token = req.headers['authorization'].split(" ")[1]
        let data:{currentUser}= jwtDecode(token)
        return data.currentUser
    }

    getAccessToken = (req)  => {
        return req.headers['authorization'].split(" ")[1]
    }

    routing = (req, res, routesType) => {
        let path = req.url?.replace(/^\/+|\/+$/g, "");
        let method = req.method
        let route = typeof routesType[method][path] !== "undefined" ? routesType[method][path] : routesType["notFound"];
        route(req, res);
    }

}



