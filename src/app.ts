import express,{Application} from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from './middlewares/error.middleware';

import token from './utils/token';
class App{
    public express : Application;
    public port : number;
    constructor(contollers:Controller[],port:number){
        this.express = express();
        this.port = port;

        this.initializeMiddleware();
        this.initializeControllers(contollers);
        this.initializeDatabaseConnection();
        this.initializeErrorHandling();

        this.express.get("/",(req,res)=>{
            res.send("This page is working");
        })
    }

    private initializeMiddleware(){
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(compression());
        this.express.use(express.json())
        this.express.use(express.urlencoded({extended:false}));
    }

    private initializeControllers(contollers:Controller[]):void{
        contollers.forEach((contoller:Controller)=>{
            this.express.use("/api",contoller.router);
        })
    }
    
    private initializeDatabaseConnection(){
        const {MONGO_USER,MONGO_PASSWORD,MONGO_PATH} = process.env;

        //Change this according to your database
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,(err)=>{
            if(err){
                console.log("Error in connecting to DB");
            }else{
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

    private initializeErrorHandling(){
        this.express.use(ErrorMiddleware);
    }

    public listen():void{
        this.express.listen(this.port,()=>{
            console.log(`App listening on port ${this.port}`);
        })
    }

}

export default App;