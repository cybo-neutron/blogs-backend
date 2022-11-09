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
const post_service_1 = __importDefault(require("./post.service"));
const post_validation_1 = __importDefault(require("./post.validation"));
const authenticate_middleware_1 = __importDefault(require("@/middlewares/authenticate.middleware"));
class PostController {
    constructor() {
        this.path = "/posts";
        this.router = (0, express_1.Router)();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, tags, description, isPublic, user_id, image } = req.body;
                const createdPost = yield this.postService.create({ title, tags, description, isPublic, user_id, image });
                res.status(201).json({ createdPost });
            }
            catch (err) {
                next(new http_exception_1.default(400, "Cannot create post"));
            }
        });
        this.fetchPost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            console.log({ id });
            try {
                const fetchedPost = yield this.postService.fetchPost(id);
                res.status(200).json(fetchedPost);
            }
            catch (error) {
                next(new http_exception_1.default(400, "Unable to fetch the post"));
            }
        });
        this.fetchAllPostOfUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("Fetch all posts of user");
            try {
                const allPosts = yield this.postService.fetchAllPostOfUser(req.user.id);
                res.status(201).json(allPosts);
            }
            catch (err) {
                next(new http_exception_1.default(400, "Unable to fetch posts"));
            }
        });
        this.fetchAllPublicPosts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.query);
            try {
                const allPosts = yield this.postService.fetchAllPublicPosts();
                res.status(201).json(allPosts);
            }
            catch (err) {
                next(new http_exception_1.default(400, "Unable to fetch posts"));
            }
        });
        this.updatePost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const { title, tags, description, date, isPublic, user_id, image } = req.body;
                const updatedData = { title, tags, description, date, isPublic, user_id, image };
                const updatedPost = yield this.postService.updatePost(id, updatedData);
                res.status(200).json(updatedPost);
                //todo : redirect to the home page -> after publishing the post.
            }
            catch (err) {
                next(new http_exception_1.default(400, "Unable to update the post"));
            }
        });
        this.deletePost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const deletedPost = yield this.postService.deletePost(id);
                res.status(200).send("Deleted" + JSON.stringify(deletedPost));
            }
            catch (error) {
                next(new http_exception_1.default(400, "Unable to delete the post"));
            }
        });
        this.initializeRoutes();
        this.postService = new post_service_1.default();
    }
    initializeRoutes() {
        //create post route (authentication required)
        //todo : add user verification middleware.
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(post_validation_1.default.create), this.create);
        // fetch all posts for a particular user (authentication Required)
        this.router.get(`${this.path}/myBlogs`, authenticate_middleware_1.default, this.fetchAllPostOfUser);
        //fetch all public post route -> to show in the home page (authentication NOT required)
        this.router.get(`${this.path}`, this.fetchAllPublicPosts);
        // fetch a particular post (authentication NOT Required)
        this.router.get(`${this.path}/:id`, this.fetchPost);
        //todo : update post (authentication required  | only the author can update the post)
        this.router.patch(`${this.path}/:id`, authenticate_middleware_1.default, this.updatePost);
        //todo : delete post (authentication required | only the author/admin can delete the post)
        this.router.delete(`${this.path}/:id`, authenticate_middleware_1.default, this.deletePost);
    }
}
exports.default = PostController;
