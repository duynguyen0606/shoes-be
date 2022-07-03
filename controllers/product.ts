import mongoose from "mongoose";
import { ProductService } from "../services/productService";
import { Utils } from "../utils/utils";


const productService = new ProductService();
const utils = new Utils()

export class ProductController {

    createProduct = async (req, res) => {
        try {

            const data: { name, price, color, size, amount, linkImg } = await utils.getPostData(req);
            
            const product = await productService.createProduct({
                _id: undefined,
                name: data.name,
                price: data.price,
                color: data.color,
                size: data.size,
                amount: data.amount,
                linkImg: data.linkImg
            })
            if (product._id === undefined) {
                return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không thể tạo mới sản phẩm" })
            }
            return utils.sendRespond(res, utils.getAccessToken(req), 201, product)

        } catch (error) {
            console.log(error)
        }
    };


    getAllProducts = async (req, res) => {
        try {
            const products = await productService.findAllProducts();
            utils.responseUnauthor(res, 200, products)

        } catch (error) {
            console.log(error)
        }
    };

    updateProduct = async (req, res) => {
        try {
            const body: { _id, data } = await utils.getPostData(req);

            if (!mongoose.isValidObjectId(body._id)) {
                return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" })
            }

            if (body._id === undefined) {
                return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Not found" })
            }
            const product = await productService.updateProduct({ _id: body._id, data: body.data })

            if (product._id === undefined) {
                return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" })
            }

            return utils.sendRespond(res, utils.getAccessToken(req), 201, product)
        } catch (error) {
            console.log(error)
        }
    };

    getProduct = async (req, res) => {
        try {
            const body: { _id } = await utils.getPostData(req)

            if (!mongoose.isValidObjectId(body._id)) {
                return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" })
            }

            let product = await productService.findProductById({ _id: body._id })
            if (product._id === undefined) {
                product = await productService.findProductById({ _id: body._id })
            }

            if (product._id === undefined) {
                return utils.responseUnauthor(res, 404, { message: "Không tìm thấy sản phầm" })
            }
            return utils.responseUnauthor(res, 200, product)

        } catch (error) {
            console.log(error)
        }
    };

    deleteProduct = async (req, res) => {
        try {
            const body: { _id } = await utils.getPostData(req)

            if (!mongoose.isValidObjectId(body._id)) {
                return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" })
            }

            const productDeleted = await productService.deleteProduct({ _id: body._id })

            if (productDeleted._id === undefined) {
                return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" })
            }

            return utils.sendRespond(res, utils.getAccessToken(req), 200, { message: "Xóa thành công", product: productDeleted })

        } catch (error) {
            console.log(error)
        }
    };
}

