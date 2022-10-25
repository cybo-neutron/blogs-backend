import validationMiddleware from "@/middlewares/validation.middleware";
import HttpException from "@/utils/exceptions/http.exception";
import Controller from "@/utils/interfaces/controller.interface";
import { Router, Request, Response, NextFunction } from "express";
import PostService from "./post.service";
import validate from './post.validation';
import Post from "./post.interface";

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

        //fetch all public post route -> to show in the home page (authentication NOT required)
        this.router.get(`${this.path}`,this.fetchAllPost);
        
        //todo : update post (authentication required  | only the author can update the post)
        this.router.patch(`${this.path}/:id`, this.updatePost);

        //todo : delete post (authentication required | only the author/admin can delete the post)
        this.router.delete(`${this.path}/:id`,this.deletePost);
        //todo : fetch all posts for a particular user (authentication required)


    }

    private create = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        
        try {
            const { title, tags, description, date, isPublic, user_id } = req.body;
            const createdPost = await this.postService.create(title, tags, description, date, isPublic, user_id);
            res.status(201).json({ createdPost });
        } catch (err) {
            next(new HttpException(400, "Cannot create post"));
        }
    }

    private fetchAllPost = async(req:Request,res:Response,next:NextFunction) : Promise<Response|void> =>{

        try{
            const allPosts = await this.postService.fetchAllPosts();
            res.status(201).json(allPosts);
        }catch(err){
            next(new HttpException(400,"Unable to fetch posts"));
        }
    }

    private updatePost = async(req:Request,res:Response,next:NextFunction) : Promise<Response| void> =>{
        const id = req.params.id;
        // console.log({id});
        try{
            const {title,tags,description,date,isPublic,user_id} = req.body;
            const updatedData = {title,tags,description,date,isPublic,user_id};
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