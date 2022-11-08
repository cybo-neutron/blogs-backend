import validationMiddleware from "@/middlewares/validation.middleware";
import HttpException from "@/utils/exceptions/http.exception";
import Controller from "@/utils/interfaces/controller.interface";
import { Router, Request, Response, NextFunction } from "express";
import PostService from "./post.service";
import validate from './post.validation';
import Post from "./post.interface";
import authenticateMiddleware from "@/middlewares/authenticate.middleware";

class PostController implements Controller {
    public path = "/posts";
    public router = Router();
    private postService : PostService;

    constructor() {
        this.initializeRoutes();
        this.postService = new PostService();
    }

    private initializeRoutes(): void {

        //create post route (authentication required)
        //todo : add user verification middleware.
        this.router.post(`${this.path}`, validationMiddleware(validate.create), this.create);

        // fetch all posts for a particular user (authentication Required)
        this.router.get(`${this.path}/myBlogs`,authenticateMiddleware,this.fetchAllPostOfUser);
        //fetch all public post route -> to show in the home page (authentication NOT required)
        this.router.get(`${this.path}`,this.fetchAllPublicPosts);
         // fetch a particular post (authentication NOT Required)
         this.router.get(`${this.path}/:id`,this.fetchPost);
         


        //todo : update post (authentication required  | only the author can update the post)
        this.router.patch(`${this.path}/:id`,authenticateMiddleware, this.updatePost);

        //todo : delete post (authentication required | only the author/admin can delete the post)
        this.router.delete(`${this.path}/:id`,authenticateMiddleware,this.deletePost);
       

    }

    private create = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        
        try {
            const { title , tags, description, isPublic, user_id,image} = req.body;
            const createdPost = await this.postService.create({title, tags, description, isPublic, user_id,image} as Post);
            res.status(201).json({ createdPost });
        } catch (err) {
            next(new HttpException(400, "Cannot create post"));
        }
    }

    private fetchPost = async (req:Request,res:Response,next:NextFunction) : Promise<Response|void> =>{
        const id = req.params.id;
        console.log({id})
        try{
            const fetchedPost = await this.postService.fetchPost(id);
            res.status(200).json(fetchedPost);
        }catch(error){
            next (new HttpException(400,"Unable to fetch the post"));
        }
    }

    private fetchAllPostOfUser = async(req:Request,res:Response,next:NextFunction) : Promise<Response|void> =>{
        console.log("Fetch all posts of user");

        try{
            const allPosts = await this.postService.fetchAllPostOfUser(req.user.id);
            res.status(201).json(allPosts);
        }catch(err){
            next(new HttpException(400,"Unable to fetch posts"));
        }
    }

    private fetchAllPublicPosts = async(req:Request,res:Response,next:NextFunction) : Promise<Response|void> =>{
        console.log(req.query);
        
        try{
            const allPosts = await this.postService.fetchAllPublicPosts();
            res.status(201).json(allPosts);
        }catch(err){
            next(new HttpException(400,"Unable to fetch posts"));
        }
    }

    private updatePost = async(req:Request,res:Response,next:NextFunction) : Promise<Response| void> =>{
        const id = req.params.id;
        
        try{
            const {title,tags,description,date,isPublic,user_id,image} = req.body;
            const updatedData = {title,tags,description,date,isPublic,user_id,image};
            const updatedPost = await this.postService.updatePost(id,updatedData);
            res.status(200).json(updatedPost);
            //todo : redirect to the home page -> after publishing the post.
        }catch(err){
            next (new HttpException(400,"Unable to update the post"));
        }
    }

    private deletePost =async (req:Request,res:Response,next:NextFunction) : Promise<Response|void> => {
        const id = req.params.id;

        try{
            const deletedPost = await this.postService.deletePost(id);
            res.status(200).send("Deleted" + JSON.stringify(deletedPost));
        }catch(error){
            next ( new HttpException(400,"Unable to delete the post"));
        }
    }

    


}

export default PostController;