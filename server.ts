// import { App } from ".";

// const myApp = new App();
// myApp.run();
import http from "http";
import passport from "passport";
import connectDatabase from "./utils/mongodb";
import { routes } from "./routes/routes";

const PORT = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {
    req.on("data", () => {})
    let path = req.url?.replace(/^\/+|\/+$/g, "");
    // let path = req.url
    let method = req.method
    let route =
            typeof routes[`${path?.split("/")[0]}`] !== "undefined" ? routes[`${path?.split("/")[0]}`] : routes["notFound"];
    route(req, res);
})

connectDatabase();


server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})

