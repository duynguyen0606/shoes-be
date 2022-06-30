import mongoose from "mongoose";
import { ProductService } from "../services/productService";
import { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PWD } from "./config";


const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}`;

const connectDatabase = (callback?: () => void) => {
  mongoose
    .connect(DB_URL, {
      auth:{
        password: DB_PWD,
        username: DB_USER,
      },
      dbName: DB_NAME,
      authSource: DB_NAME
    })
    .then(() => {
      console.log("Connect database successfully!");
      if (callback) callback();
    })
    .catch((err) => console.error("MongoDB initial connection error: ", err));
  new ProductService().createProduct({
    linkImg:["https://cdn.shopify.com/s/files/1/0265/2146/8985/products/116_2075a1ce-d97d-4b89-bb50-6ed97c1c396f_360x.jpg?v=1652777580"],
    name: "Nike",
    price:10000,
    color:"green",
    size:[
      {
        size: 42,
        amount: 100
      }
    ]
  })
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB error: ", err);
  });
};

export default connectDatabase;
