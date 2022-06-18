import http from "http"
import jwt from "jsonwebtoken"
import { UserService } from "../services/userService"
import { Utils } from "../utils/utils"
import bcrypt from "bcryptjs"
import { Role } from "../models/user"
import { UserDb } from "../database/mongo/user"

const utils = new Utils()
const userService = new UserService()
const userDB = new UserDb()
const BCRYPT_SALT = 10

export class UserController {

    login = async (req, res) => {
        try {
            const body: { email, password } = await utils.getPostData(req);
            let user = await userService.findUserByEmail({email: body.email})
            console.log(user)
            if (!user) {
                user = await userService.findUserByEmail({email: body.email})
            }

            if (!user) {
                let err: any = new Error("Email or Password not match");
                err.status = 404;
                throw err;
            }

            if (!bcrypt.compareSync(body.password, user.password)) {
                let err: any = new Error("Username/Email or Password not match");
                err.status = 400;
                throw err;
            }

            const userFormatted = {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phoneNumber: user.phoneNumber,
                role: user.role
            }

            let acessToken = utils.generateAccessToken(userFormatted)
            const loginResult = {
                acessToken,
                userFormatted
            }
            utils.sendRespond(res,acessToken,200,loginResult)

        } catch (error) {
            throw error
        }
    };

    createUser = async (req, res) => {
        try {
            const body: { name, email, password  } = await utils.getPostData(req);
            const user = await userDB.createUser({
                email: body.email,
                password: body.password,
                name: body.name,
                role: 0
            })
    
            console.log(user)
            res.end("Successfully")
        } catch (error) {
            res.end("Error")
            throw error
        }
    };

    createAdmin = async (req, res) => {
        try {

            const body: { name, email, password, address, phoneNumber, role } = await utils.getPostData(req);
            let emailExist = await userDB.findUserByEmail({email: body.email})
            
            if (emailExist._id !== undefined) {
                let err: any = new Error("Email đã tồn tại trong hệ thống");
                err.status = 400;
                throw err;
            }

            const password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(BCRYPT_SALT))

            const admin = await userDB.createUser({
                email: body.email,
                password: password,
                name: body.name,
                role: body.role
            })

            await utils.sendRespond(res, utils.getAccessToken(req),200,admin )

        } catch (error) {
            throw error
        }
    };

    updateProfile = async (req, res) => {

    };

    deleteUser = async (req, res) => {
        try {

            const body: {email} = await utils.getPostData(req);
            const result = await userService.deleteUser({email: body.email});
            if (result._id === undefined) {
                await utils.sendRespond(res, utils.getAccessToken(req),200, {message: "Đã xóa thành công"})
            } else await utils.sendRespond(res, utils.getAccessToken(req), 404,{message: "Đã xảy ra lỗi"} ) 

        } catch (error) {
            console.log(error)
        }
    };

    getAllUsers = async (req, res) => {
        try {
            let currentUer = await utils.requestUser(req)
            console.log(currentUer)
            const users = await userService.getAllUsers();
    
    
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200);
            res.write(JSON.stringify(users));
            res.end("\n");
        } catch (error) {
            
        }
    };

    getUser = async (req, res) => {
      try {
        const body: {email} = await utils.getPostData(req);
        let user = await userService.findUserByEmail({email: body.email})
        if (user.email === "") {
            let error = {message: "Not found", status: 404}
            utils.sendRespond(res, utils.getAccessToken(req), 404, error )
        }
        else utils.sendRespond(res, utils.getAccessToken(req), 200, user)
      } catch (error) {
        console.log(error)
      }
   
    };


}



