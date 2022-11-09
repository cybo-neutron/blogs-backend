"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_middleware_1 = __importDefault(require("@/middlewares/validation.middleware"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const express_1 = require("express");
const user_service_1 = __importDefault(require("./user.service"));
const user_validation_1 = __importDefault(require("./user.validation"));
class UserController {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const response = yield this.userService.register(name, email, password);
                res.status(201).json(response);
            }
            catch (err) {
                next(new http_exception_1.default(400, err.message));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("login");
            try {
                const { email, password } = req.body;
                const response = yield this.userService.login(email, password);
                res.status(201).json(response);
            }
            catch (err) {
                next(new http_exception_1.default(400, err.message));
            }
        });
        this.userService = new user_service_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_validation_1.default.register), this.register);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(user_validation_1.default.login), this.login);
        //test
        this.router.get(`${this.path}`, (req, res) => {
            res.send("hello");
        });
    }
}
exports.default = UserController;
