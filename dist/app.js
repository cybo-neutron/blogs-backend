"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
var App = /** @class */ (function () {
    function App(contollers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeMiddleware();
        this.initializeControllers(contollers);
        this.initializeDatabaseConnection();
        this.initializeErrorHandling();
        this.express.get("/", function (req, res) {
            res.send("This page is working");
        });
    }
    App.prototype.initializeMiddleware = function () {
        this.express.use((0, helmet_1.default)());
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)("dev"));
        this.express.use((0, compression_1.default)());
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
    };
    App.prototype.initializeControllers = function (contollers) {
        var _this = this;
        contollers.forEach(function (contoller) {
            _this.express.use("/api", contoller.router);
        });
    };
    App.prototype.initializeDatabaseConnection = function () {
        var _a = process.env, MONGO_USER = _a.MONGO_USER, MONGO_PASSWORD = _a.MONGO_PASSWORD, MONGO_PATH = _a.MONGO_PATH;
        //Change this according to your database
        mongoose_1.default.connect("mongodb+srv://".concat(MONGO_USER, ":").concat(MONGO_PASSWORD).concat(MONGO_PATH), function (err) {
            if (err) {
                console.log("Error in connecting to DB");
                console.log(err);
            }
            else {
                console.log("Successfully connected to DB");
            }
        });
        // mongoose.connect('mongodb://localhost:27017/blogsDB',(err)=>{
        //     if(err){
        //         console.log("Error in connecting to DB");
        //     }else{
        //         console.log("Successfully connected to DB");
        //     }
        // })
    };
    App.prototype.initializeErrorHandling = function () {
        this.express.use(error_middleware_1.default);
    };
    App.prototype.listen = function () {
        var _this = this;
        this.express.listen(this.port, function () {
            console.log("App listening on port ".concat(_this.port));
        });
    };
    return App;
}());
exports.default = App;
