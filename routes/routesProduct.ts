
import { ProductController } from "../controllers/product";
import http from "http"

const controllers = new ProductController()

const routesProduct = {

  GET: {
    "product/list": async (req, res) => {
      await controllers.getAllProducts(req, res)
    },
    "product/detail": async (req, res) => {
      await controllers.getProduct(req, res)
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
export default routesProduct


// router.get('/product/list', controllers.getAllProducts(req, res))
// router.get('/product/detail', controllers.getProduct(req, res))
// router.post('/product/create-product', controllers.createProduct(req, res))
// router.post('/product/update-product', controllers.updateProduct(req, res))
// router.post('/product/delete-product', controllers.deleteProduct(req, res))


// export default router