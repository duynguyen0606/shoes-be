import { UserController } from "../controllers/user";
const controllers = new UserController()

const routesUser = {
    GET: {
      "user/list": async (req, res) => {
        await controllers.getAllUsers(req, res)
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
        await controllers.deleteUser(req, res)
      },
      "user/update-profile": async (req, res) => {
        await controllers.updateProfile(req, res)
      },
      "user/detail": async (req, res) => {
        await controllers.getUser(req, res)
      },
      "user/change-password": async (req, res) => {
        await controllers.changePassword(req, res)
      },
    },
    notFound: (req, res) => { res.end({ message: "Not found", status: 404 }) }
}

export default routesUser
