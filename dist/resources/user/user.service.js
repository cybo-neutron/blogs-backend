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
const token_1 = __importDefault(require("@/utils/token"));
const user_model_1 = __importDefault(require("./user.model"));
class UserService {
    constructor() {
        this.user = user_model_1.default;
    }
    //Register
    register(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.create({ name, email, password });
                const accessToken = token_1.default.createToken(user);
                const data = {
                    token: accessToken,
                    name: user.name,
                    email: user.email,
                    user_id: user._id
                };
                return data;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ email, password });
            try {
                //check if email is present
                const user = yield this.user.findOne({ email });
                if (!user) {
                    //todo : change the error message
                    throw new Error("No user by this name");
                }
                //verify password
                //if verified -> send the token after logging in.
                if (yield user.isValidPassword(password)) {
                    const accessToken = yield token_1.default.createToken(user);
                    const data = {
                        token: accessToken,
                        name: user.name,
                        email: user.email,
                        user_id: user._id
                    };
                    return data;
                }
                else {
                    throw new Error("Wrong Credentials");
                }
            }
            catch (err) {
                console.log(err);
                throw new Error("Unable to login");
            }
        });
    }
}
exports.default = UserService;
