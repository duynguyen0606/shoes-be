import { ProductDb } from "../database/mongo/product";
import { ProductService } from "../services/productService";
import { Utils } from "../utils/utils";


const productService = new ProductService();
const productDB = new ProductDb()
const utils = new Utils()

export class ProductController {

    createProduct = async (req, res) => {
        try {
            const data : {name, price, color, size, amount, linkImg } = await utils.getPostData(req, res);
            const product = await productDB.createProduct({
                _id: undefined,
                name: data.name,
                price: data.price,
                color: data.color,
                size: data.size,
                amount: data.amount,
                linkImg: data.linkImg
            })
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200);
            res.write(JSON.stringify(product));
            res.end("\n");
        } catch (error) {
            console.log(error)
        }
    };
    
    
    getAllProducts = async (req, res) => {
        const data = await productService.findAllProducts();
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.write(JSON.stringify(data));
        res.end("\n");
    };
    
    updateProduct = async (req, res)=>{
        const data : {name, price, color, size, amount, linkImg } = await utils.getPostData(req, res);
        const product = await productDB.createProduct({
            _id: undefined,
            name: data.name,
            price: data.price,
            color: data.color,
            size: data.size,
            amount: data.amount,
            linkImg: data.linkImg
        })
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.write(JSON.stringify(product));
        res.end("\n");
    };
    
    getProduct = async (req, res) => {
    
    };
    
    deleteProduct = async (req, res) => {
    
    };
}

