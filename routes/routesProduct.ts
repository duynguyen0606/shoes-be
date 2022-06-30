
import { ProductController } from "../controllers/product";
const controllers = new ProductController()

const routesProduct = {

  GET: {
    "product/list": async (req, res) => {
      await controllers.getAllProducts(req, res)
    }
  },

  POST: {
    "product/create-product": async (req, res) => {
      await controllers.createProduct(req, res);
    },
    "product/update-product": async (req, res) => {
      await controllers.updateProduct(req, res)
    },
    "product/delete-product": async (req, res) => {
      await controllers.deleteProduct(req, res)
    },
    "product/detail": async (req, res) => {
      await controllers.getProduct(req, res)
    }
  },
  // notFound: (req, res) => { res.end({ message: "Not found", status: 404 }) } 

}
export default routesProduct


