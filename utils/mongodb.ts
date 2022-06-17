import mongoose from "mongoose";

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = '27017',
  DB_USER = '',
  DB_PWD = '',
  DB_NAME = 'T20CNW',
} = process.env;

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

  mongoose.connection.on("error", (err) => {
    console.log("MongoDB error: ", err);
  });
};

export default connectDatabase;
