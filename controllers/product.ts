import mongoose from "mongoose";
import { ProductModel } from "../database/mongo/product";
import { ProductService } from "../services/productService";
import { Utils } from "../utils/utils";


const productService = new ProductService();
const utils = new Utils()

export class ProductController {

    createProduct = async (req, res) => {
         try {
            let data = "";
            req.on("data", async (chunk) => {
                data += chunk.toString();
                const body: { name, price, color, size, linkImg } = JSON.parse(data)
                const product = await productService.createProduct({
                    name: body.name,
                    price: body.price,
                    color: body.color,
                    size: body.size,
                    linkImg: body.linkImg
                })
                if (product._id === undefined) {
                    return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không thể tạo mới sản phẩm" })
                }
                return utils.sendRespond(res, utils.getAccessToken(req), 201, product)

            })
        } catch (error) {
            utils.responseUnauthor(res, 400, { error: error })
        }
    };


    getAllProducts = async (req, res) => {
        try {
            const checkLogin = req.headers['authorization']
            const products = await productService.findAllProducts();

            if (checkLogin === undefined) {
                return utils.responseUnauthor(res, 200, products)
            }
            return utils.sendRespond(res, utils.getAccessToken(req), 200, products)

        } catch (error) {
            utils.responseUnauthor(res, 400, { error: error })
        }
    };

    updateProduct = async (req, res) => {
        try {
            let data = "";
            req.on("data", async (chunk) => {
                data += chunk.toString();
                const body: { _id, data } = JSON.parse(data)

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
            })
        } catch (error) {
            utils.responseUnauthor(res, 400, { error: error })
        }
    };

    getProduct = async (req, res) => {
        try {
            let data = "";
            req.on("data", async (chunk) => {
                data += chunk.toString()
                const body: { _id } = JSON.parse(data)
                const checkLogin = req.headers['authorization']

                if (!mongoose.isValidObjectId(body._id)) {
                    return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" })
                }

                let product = await productService.findProductById({ _id: body._id })
                if (product._id === undefined) {
                    product = await productService.findProductById({ _id: body._id })
                }

                if (checkLogin === undefined) {
                    if (product._id === undefined) {
                        return utils.responseUnauthor(res, 404, { message: "Không tìm thấy sản phầm" })
                    }
                    return utils.responseUnauthor(res, 200, product)
                }
                else {
                    if (product._id === undefined) {
                        return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phầm" })
                    }
                    return utils.sendRespond(res, utils.getAccessToken(req), 200, product)
                }
            })


        } catch (error) {
            utils.responseUnauthor(res, 400, { error: error })
        }
    };

    deleteProduct = async (req, res) => {
        try {
            let data = "";
            req.on("data", async (chunk) => {
                data += chunk.toString();
                const body: { _id } = JSON.parse(data)

                if (!mongoose.isValidObjectId(body._id)) {
                    return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" })
                }

                const productDeleted = await productService.deleteProduct({ _id: body._id })

                if (productDeleted._id === undefined) {
                    return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phẩm" })
                }

                return utils.sendRespond(res, utils.getAccessToken(req), 200, { message: "Xóa thành công", product: productDeleted })
            })

        } catch (error) {
            utils.responseUnauthor(res, 400, { error: error })
        }
    };

    getProductByFilter = async (req, res) => {
        try {
            let data = "";
            req.on("data", async (chunk) => {
                data += chunk.toString()
                const body: { category } = JSON.parse(data)
                let product = await ProductModel.find({
                    category: { $in: body.category }
                })
               
                if (!product.length) {
                    return utils.sendRespond(res, utils.getAccessToken(req), 404, { message: "Không tìm thấy sản phầm" })
                }
                return utils.sendRespond(res, utils.getAccessToken(req), 200, product)
            })


        } catch (error) {
            utils.responseUnauthor(res, 400, { error: error })
        }
    };

}

