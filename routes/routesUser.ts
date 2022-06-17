import { App } from "..";
import { UserController } from "../controllers/user";

const controllers = new UserController()

const routesUser = {
    GET: {
      "user/list": async (req, res) => {
        await controllers.getAllUsers(req, res)
      },
      "user/profile": async (req, res) => {

      }
    },
    POST: {
      login: async (req, res) => {

        await controllers.login(req, res)
      },
      register: async (req, res) => {
        await controllers.createUser(req, res)
      },
      "user/create-admin": async (req, res) => {
        await controllers.createAdmin(req, res)
      },
      "user/delete": async (req, res) => {

      },
      "user/update-profile": async (req, res) => {

      }
    },
    notFound: (req, res) => {
        let payload = {
          message: "File not found",
          code: 404
        }
        let payloadStr = JSON.stringify(payload);
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(404);
    
        res.write(payloadStr);
        res.end("\n");
      }
}

export default routesUser
