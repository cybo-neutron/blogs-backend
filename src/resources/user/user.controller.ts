import validationMiddleware from "@/middlewares/validation.middleware";
import HttpException from "@/utils/exceptions/http.exception";
import Controller from "@/utils/interfaces/controller.interface";
import { NextFunction, Request, Router,Response } from "express";
import UserService from "./user.service";
import validate from './user.validation';

class UserController implements Controller{
    public path = '/users';
    public router = Router();
    private userService : UserService;

    constructor(){
        this.userService = new UserService();
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(`${this.path}/register`, validationMiddleware(validate.register),this.register);
        
        this.router.post(`${this.path}/login`, validationMiddleware(validate.login),this.login);
        

        //test
        this.router.get(`${this.path}`,(req,res)=>{
            res.send("hello")
        })

    }

    private register = async(
        req:Request,
        res : Response,
        next:NextFunction
    ):Promise<Response|void> =>{
        try {
            const {name,email,password} = req.body;
            const response =await this.userService.register(name,email,password);
            res.status(201).json(response);
        } catch (err:any) {
            next(new HttpException(400,err.message));
        }
    }

    private login = async(req:Request,res:Response,next:NextFunction):Promise<Response|void>=>{
        console.log("login")
        try{
            const {email,password} = req.body;
            const response = await this.userService.login(email,password);
            res.status(201).json(response);
        }catch(err:any){
            next(new HttpException(400,err.message));
        }
    }




}

export default UserController;