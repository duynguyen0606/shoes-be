import mongoose from "mongoose";
import { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PWD } from "./config";
import { UserDb } from "../database/mongo/user";

const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}`;
const userDB = new UserDb();

const connectDatabase = (callback?: () => void) => {
  mongoose
    .connect(DB_URL, {
      auth: {
        password: DB_PWD,
        username: DB_USER,
      },
      dbName: DB_NAME,
      authSource: DB_NAME,
    })
    .then(() => {
      console.log("Connect database successfully!");
      if (callback) callback();
    })
    .catch(err => console.error("MongoDB initial connection error: ", err));

  mongoose.connection.on("error", err => {
    console.log("MongoDB error: ", err);
  });
};

export default connectDatabase;
