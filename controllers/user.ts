import { UserService } from "../services/userService";
import { Utils } from "../utils/utils";
import bcrypt from "bcryptjs";
import { Role } from "../models/user";
import { BCRYPT_SALT } from "../utils/config";
import jwtDecode from "jwt-decode";
import { headers } from "../utils/utils";

const utils = new Utils();
const userService = new UserService();

export class UserController {
  login = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { email: string; password: string } = JSON.parse(data);
        let user = await userService.findUserByEmail({ email: body.email });
        if (!user) {
          user = await userService.findUserByEmail({ email: body.email });
        }

        if (!user) {
          return utils.responseUnauthor(res, 200, {
            message: "Email or Password not match",
            status: 0,
          });
        }

        if (!bcrypt.compareSync(body.password, user.password)) {
          return utils.responseUnauthor(res, 200, {
            message: "Email or Password not match",
            status: 0,
          });
        }

        const userFormatted = {
          id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          phoneNumber: user.phoneNumber,
          role: user.role,
        };

        let accessToken = utils.generateAccessToken(userFormatted);
        const loginResult = {
          accessToken,
          userFormatted,
        };
        return utils.sendRespond(res, accessToken, 200, {
          ...loginResult,
          status: 1,
        });
      });
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };

  createUser = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: {
          name: string;
          email: string;
          password: string;
          address: string;
          phoneNumber: string;
        } = JSON.parse(data);
        let emailExist = await userService.findUserByEmail({
          email: body.email,
        });

        if (emailExist._id !== undefined) {
          res.setHeader("Content-Type", "application/json");
          res.writeHead(404, headers);
          res.write(
            JSON.stringify({
              message: "Email đã tồn tại trong hệ thống",
              status: 0,
            })
          );
          res.end("\n");
          return;
        }

        const password = bcrypt.hashSync(
          body.password,
          bcrypt.genSaltSync(BCRYPT_SALT)
        );

        const user = await userService.createUser({
          _id: undefined,
          email: body.email,
          password: password,
          name: body.name,
          address: body.address,
          phoneNumber: body.phoneNumber,
          role: Role.client,
        });

        res.setHeader("Content-Type", "application/json");
        res.writeHead(201, headers);
        res.write(
          JSON.stringify({
            user,
            accessToken: utils.generateAccessToken({
              id: user._id,
              email: user.email,
              name: user.name,
              address: user.address ?? "",
              phoneNumber: user.phoneNumber ?? " ",
              role: Role.client,
            }),
            status: 1,
          })
        );
        res.end("\n");
      });
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };

  createAdmin = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();

        const body: { name; email; password; address; phoneNumber; role } =
          JSON.parse(data);
        let emailExist = await userService.findUserByEmail({
          email: body.email,
        });

        if (emailExist._id !== undefined) {
          return await utils.sendRespond(res, utils.getAccessToken(req), 404, {
            message: "Email đã tồn tại trong hệ thống",
          });
        }

        const password = bcrypt.hashSync(
          body.password,
          bcrypt.genSaltSync(BCRYPT_SALT)
        );

        const admin = await userService.createUser({
          _id: undefined,
          email: body.email,
          password: password,
          name: body.name,
          address: body.address,
          phoneNumber: body.phoneNumber,
          role: Role.admin,
        });

        await utils.sendRespond(res, utils.getAccessToken(req), 201, admin);
      });
    } catch (error) {
      utils.sendRespond(res, utils.getAccessToken(req), 400, { error: error });
    }
  };

  updateProfile = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { address; phoneNumber } = JSON.parse(data);
        let currentUser = await utils.requestUser(req);

        let email = currentUser.email;
        let user = await userService.updateUser({ email: email, data: body });
        let userToken = {
          id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          phoneNumber: user.phoneNumber,
          role: user.role,
        };
        if (user._id === undefined) {
          return utils.sendRespond(res, utils.getAccessToken(req), 404, {
            message: "Đã xảy ra lỗi",
          });
        }
        utils.sendRespond(res, utils.generateAccessToken(userToken), 201, user);
      });
    } catch (error) {
      utils.sendRespond(res, utils.getAccessToken(req), 400, { error: error });
    }
  };

  deleteUser = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { email } = JSON.parse(data);
        const result = await userService.deleteUser({ email: body.email });
        if (result.email === body.email) {
          await utils.sendRespond(res, utils.getAccessToken(req), 200, {
            message: "Đã xóa thành công",
            account: result,
          });
        } else
          await utils.sendRespond(res, utils.getAccessToken(req), 404, {
            message: "Đã xảy ra lỗi",
          });
      });
    } catch (error) {
      utils.sendRespond(res, utils.getAccessToken(req), 400, { error: error });
    }
  };

  getAllUsers = async (req, res) => {
    try {
      let token: { exp } = jwtDecode(utils.getAccessToken(req));
      const users = await userService.getAllUsers();
      utils.sendRespond(res, utils.getAccessToken(req), 200, users);
    } catch (error) {
      utils.sendRespond(res, utils.getAccessToken(req), 400, { error: error });
    }
  };

  getUser = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { email } = JSON.parse(data);
        let user = await userService.findUserByEmail({ email: body.email });
        if (user.email === "") {
          let error = { message: "Not found", status: 404 };
          return utils.sendRespond(res, utils.getAccessToken(req), 404, error);
        }
        utils.sendRespond(res, utils.getAccessToken(req), 200, user);
      });
    } catch (error) {
      utils.sendRespond(res, utils.getAccessToken(req), 400, { error: error });
    }
  };

  changePassword = async (req, res) => {     
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { passwordOld, passwordNew } = JSON.parse(data);

        let currentUser = await utils.requestUser(req);

        let email = currentUser.email;
        const passwordOld = bcrypt.hashSync(
          body.passwordOld,
          bcrypt.genSaltSync(BCRYPT_SALT)
        );
        const passwordNew = bcrypt.hashSync(
          body.passwordNew,
          bcrypt.genSaltSync(BCRYPT_SALT)
        )
        let user = await userService.updateUser({
          email: email,
          data: { password: passwordNew },
        });
        let userToken = {
          id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          phoneNumber: user.phoneNumber,
          role: user.role,
        };
        if (user._id === undefined) {
          return utils.sendRespond(res, utils.getAccessToken(req), 404, {
            message: "Đã xảy ra lỗi",
          });
        }
        utils.sendRespond(res, utils.generateAccessToken(userToken), 201, user);
        
      });
    } catch (error) {
      utils.sendRespond(res, utils.getAccessToken(req), 400, { error: error });
    }
  };

  logout = async (req, res) => {
    utils.responseUnauthor(res, 200, { message: "Đăng xuất thành công" });
  };

  checkLogin = async (req, res) => {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      const body: { currentUser; iat; exp } = jwtDecode(token);
      utils.sendRespond(res, utils.getAccessToken(req), 200, {
        currentUser: body.currentUser,
      });
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };
}
