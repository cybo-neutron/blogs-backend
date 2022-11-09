"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
class App {
    constructor(contollers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeMiddleware();
        this.initializeControllers(contollers);
        this.initializeDatabaseConnection();
        this.initializeErrorHandling();
    }
    initializeMiddleware() {
        this.express.use((0, helmet_1.default)());
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)("dev"));
        this.express.use((0, compression_1.default)());
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
    }
    initializeControllers(contollers) {
        contollers.forEach((contoller) => {
            this.express.use("/api", contoller.router);
        });
    }
    initializeDatabaseConnection() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        //Change this according to your database
        mongoose_1.default.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, (err) => {
            if (err) {
                console.log("Error in connecting to DB");
            }
            else {
                console.log("Successfully connected to DB");
            }
        });
        console.log("Hey you need to uncomment the above line for DB connection");
        // mongoose.connect('mongodb://localhost:27017/blogsDB',(err)=>{
        //     if(err){
        //         console.log("Error in connecting to DB");
        //     }else{
        //         console.log("Successfully connected to DB");
        //     }
        // })
    }
    initializeErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}
exports.default = App;
