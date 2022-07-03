import { Utils } from "../utils/utils";
import { OrderService } from "../services/orderService";
import mongoose from "mongoose";
import { OrderStatus } from "../models/order";

const utils = new Utils()
const orderService = new OrderService()

export class OrderController {
    getAllOrders = async (req, res) => {
        try {
            const orders = await orderService.getAllOrders()
            utils.sendRespond(res, utils.getAccessToken(req), 200, orders)
        } catch (error) {
            
        }
    };

    getOrder = async (req, res) => {
        try {
            const body: {id} = await utils.getPostData(req);

            if(!mongoose.isValidObjectId(body.id)) {
                return utils.sendRespond(res, utils.getAccessToken(req),404, {message: "Không tìm thấy đơn hàng"})
            }
            let order = await orderService.getOrderById({id: body.id})
            if(order._id === undefined) {
                return utils.sendRespond(res, utils.getAccessToken(req),404, {message: "Không tìm thấy đơn hàng"})
            }

            return utils.sendRespond(res, utils.getAccessToken(req),200, order)

        } catch (error) {
            
        }
    };

    getOrderbyStatus = async (req, res) => {
        try {
            const body: {status} = await utils.getPostData(req);

            if (OrderStatus[body.status] === undefined ){
                return utils.sendRespond(res, utils.getAccessToken(req),404, {message: "Trạng thái không hợp lệ"})
            }
            const orders = await orderService.getOrderByStatus({status: body.status})
            return utils.sendRespond(res, utils.getAccessToken(req),200, orders)
        } catch (error) {
            
        }
    };

    createOrder = async (req, res) => {
        try {

            const body: { products,totalPrice, status } = await utils.getPostData(req);
            const currentUser = await utils.requestUser(req);


            let order = {
                _id: undefined,
                products: body.products,
                totalPrice: body.totalPrice,
                userId: currentUser._id,
                address: currentUser.address,
                phoneNumber: currentUser.phoneNumber,
                status: body.status
            }
            let orderCreated = await orderService.createOrder({ data: order });
            if (orderCreated._id === undefined) {
                return utils.sendRespond(res, utils.getAccessToken(req), 400, { message: "Tạo đơn hàng không thành công" })
            }
            return utils.sendRespond(res, utils.getAccessToken(req), 201, orderCreated)
        } catch (error) {

        }
    };

    updateOrder = async (req, res) => {
        try {

            const body: { id, data } =  await utils.getPostData(req)
            const orderUpdated = await orderService.updateOrder({id: body.id, data: body.data})
            if(orderUpdated._id === undefined) {
                return utils.sendRespond(res, utils.getAccessToken(req), 400, {message: "Cập nhật thất bại"})
            }
            return utils.sendRespond(res, utils.getAccessToken(req), 201, orderUpdated)

        } catch (error) {
            console.log(error)
        }
    };
}