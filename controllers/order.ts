import { Utils } from "../utils/utils";
import { OrderService } from "../services/orderService";
import mongoose from "mongoose";
import { OrderStatus } from "../models/order";

const utils = new Utils();
const orderService = new OrderService();

export class OrderController {
  getAllOrders = async (req, res) => {
    try {
      const orders = await orderService.getAllOrders();
      utils.sendRespond(res, utils.getAccessToken(req), 200, orders);
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };

  getOrderByIdUser = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { id } = JSON.parse(data);
        const orders = await orderService.getOrderByIdUser({ id: body.id});
        utils.sendRespond(res, utils.getAccessToken(req), 200, orders);
      })
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };

  getOrder = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { id } = JSON.parse(data);

        if (!mongoose.isValidObjectId(body.id)) {
          return utils.sendRespond(res, utils.getAccessToken(req), 404, {
            message: "Không tìm thấy đơn hàng",
          });
        }
        let order = await orderService.getOrderById({ id: body.id });
        if (order._id === undefined) {
          return utils.sendRespond(res, utils.getAccessToken(req), 404, {
            message: "Không tìm thấy đơn hàng",
          });
        }

        return utils.sendRespond(res, utils.getAccessToken(req), 200, order);
      });
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };

  getOrderbyStatus = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { status } = JSON.parse(data);

        if (OrderStatus[body.status] === undefined) {
          return utils.sendRespond(res, utils.getAccessToken(req), 404, {
            message: "Trạng thái không hợp lệ",
          });
        }
        const orders = await orderService.getOrderByStatus({
          status: body.status,
        });
        return utils.sendRespond(res, utils.getAccessToken(req), 200, orders);
      });
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };

  createOrder = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();
        const body: { products; totalPrice; status; phoneNumber; address; userId } =
          JSON.parse(data);
        const currentUser = await utils.requestUser(req);

        let order = {
          ...body,
          _id: undefined,
          userId: currentUser.id,
          name: currentUser.name,
        };
        let orderCreated = await orderService.createOrder({ data: order });
        if (orderCreated._id === undefined) {
          return utils.sendRespond(res, utils.getAccessToken(req), 400, {
            message: "Tạo đơn hàng không thành công",
          });
        }
        return utils.sendRespond(
          res,
          utils.getAccessToken(req),
          201,
          orderCreated
        );
      });
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };

  updateOrder = async (req, res) => {
    try {
      let data = "";
      req.on("data", async chunk => {
        data += chunk.toString();

        const body: { _id: any; data } = JSON.parse(data);
        const orderUpdated = await orderService.updateOrder({
          id: body._id,
          data: body.data,
        });
        if (orderUpdated._id === undefined) {
          return utils.sendRespond(res, utils.getAccessToken(req), 400, {
            message: "Cập nhật thất bại",
          });
        }
        return utils.sendRespond(
          res,
          utils.getAccessToken(req),
          201,
          orderUpdated
        );
      });
    } catch (error) {
      utils.responseUnauthor(res, 400, { error: error });
    }
  };
}
