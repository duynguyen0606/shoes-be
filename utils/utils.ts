import jwt from "jsonwebtoken"
import { ObjectId } from "mongoose";
import { Role } from "../models/user";
const TOKEN_SECRET = "Long-Machine-Panama-82"


export class Utils {

    getPostData = async (req, res) => {
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

    generateAccessToken = (currentUser :{
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

}



