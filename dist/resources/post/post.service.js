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
const post_model_1 = __importDefault(require("@/resources/post/post.model"));
class PostService {
    constructor() {
        this.post = post_model_1.default;
    }
    create(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Create post.service");
            try {
                const post = yield this.post.create(blog);
                return post;
            }
            catch (error) {
                throw new Error("Unable to create post");
            }
        });
    }
    fetchAllPostOfUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.post.find({ user_id });
                return posts;
            }
            catch (error) {
                throw new Error("Unable to fetch posts");
            }
        });
    }
    fetchAllPublicPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Showing public posts");
            try {
                const posts = yield this.post.find({ isPublic: true });
                return posts;
            }
            catch (error) {
                throw new Error("Unable to fetch posts");
            }
        });
    }
    fetchPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.post.findById(id);
                return post;
            }
            catch (error) {
                throw new Error("Unable to fetch the post (Check the id)");
            }
        });
    }
    updatePost(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("update post | post.service");
            console.log(newData);
            try {
                // console.log("Data to be updated",{newData});
                const updatedPost = yield this.post.findOneAndUpdate({ _id: id }, newData, { new: true });
                // console.log({updatedPost});
                return updatedPost;
            }
            catch (err) {
                throw new Error("Unable to update post");
            }
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPost = yield this.post.findByIdAndDelete(id);
                return deletedPost;
            }
            catch (err) {
                throw new Error("Unable to delete post");
            }
        });
    }
}
exports.default = PostService;
