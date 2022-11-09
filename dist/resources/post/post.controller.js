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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validation_middleware_1 = __importDefault(require("@/middlewares/validation.middleware"));
var http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
var express_1 = require("express");
var post_service_1 = __importDefault(require("./post.service"));
var post_validation_1 = __importDefault(require("./post.validation"));
var authenticate_middleware_1 = __importDefault(require("@/middlewares/authenticate.middleware"));
var PostController = /** @class */ (function () {
    function PostController() {
        var _this = this;
        this.path = "/posts";
        this.router = (0, express_1.Router)();
        this.create = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, title, tags, description, isPublic, user_id, image, createdPost, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, title = _a.title, tags = _a.tags, description = _a.description, isPublic = _a.isPublic, user_id = _a.user_id, image = _a.image;
                        return [4 /*yield*/, this.postService.create({ title: title, tags: tags, description: description, isPublic: isPublic, user_id: user_id, image: image })];
                    case 1:
                        createdPost = _b.sent();
                        res.status(201).json({ createdPost: createdPost });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        next(new http_exception_1.default(400, "Cannot create post"));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.fetchPost = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, fetchedPost, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        console.log({ id: id });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.postService.fetchPost(id)];
                    case 2:
                        fetchedPost = _a.sent();
                        res.status(200).json(fetchedPost);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        next(new http_exception_1.default(400, "Unable to fetch the post"));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAllPostOfUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var allPosts, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Fetch all posts of user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.postService.fetchAllPostOfUser(req.user.id)];
                    case 2:
                        allPosts = _a.sent();
                        res.status(201).json(allPosts);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        next(new http_exception_1.default(400, "Unable to fetch posts"));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.fetchAllPublicPosts = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var allPosts, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.postService.fetchAllPublicPosts()];
                    case 2:
                        allPosts = _a.sent();
                        res.status(201).json(allPosts);
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        next(new http_exception_1.default(400, "Unable to fetch posts"));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updatePost = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, _a, title, tags, description, date, isPublic, user_id, image, updatedData, updatedPost, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = req.body, title = _a.title, tags = _a.tags, description = _a.description, date = _a.date, isPublic = _a.isPublic, user_id = _a.user_id, image = _a.image;
                        updatedData = { title: title, tags: tags, description: description, date: date, isPublic: isPublic, user_id: user_id, image: image };
                        return [4 /*yield*/, this.postService.updatePost(id, updatedData)];
                    case 2:
                        updatedPost = _b.sent();
                        res.status(200).json(updatedPost);
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _b.sent();
                        next(new http_exception_1.default(400, "Unable to update the post"));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deletePost = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, deletedPost, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.postService.deletePost(id)];
                    case 2:
                        deletedPost = _a.sent();
                        res.status(200).send("Deleted" + JSON.stringify(deletedPost));
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        next(new http_exception_1.default(400, "Unable to delete the post"));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
        this.postService = new post_service_1.default();
    }
    PostController.prototype.initializeRoutes = function () {
        //create post route (authentication required)
        //todo : add user verification middleware.
        this.router.post("".concat(this.path), (0, validation_middleware_1.default)(post_validation_1.default.create), this.create);
        // fetch all posts for a particular user (authentication Required)
        this.router.get("".concat(this.path, "/myBlogs"), authenticate_middleware_1.default, this.fetchAllPostOfUser);
        //fetch all public post route -> to show in the home page (authentication NOT required)
        this.router.get("".concat(this.path), this.fetchAllPublicPosts);
        // fetch a particular post (authentication NOT Required)
        this.router.get("".concat(this.path, "/:id"), this.fetchPost);
        //todo : update post (authentication required  | only the author can update the post)
        this.router.patch("".concat(this.path, "/:id"), authenticate_middleware_1.default, this.updatePost);
        //todo : delete post (authentication required | only the author/admin can delete the post)
        this.router.delete("".concat(this.path, "/:id"), authenticate_middleware_1.default, this.deletePost);
    };
    return PostController;
}());
exports.default = PostController;
