import connectDatabase from "./utils/mongodb";

class App {
    run(){
        connectDatabase();
    }
}
export { App };