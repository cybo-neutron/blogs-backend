import express,{Application} from 'express';
import mongoose, { mongo } from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from './middlewares/error.middleware';

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
        // mongoose.connect(`mongodb:/${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
        console.log("Hey you need to uncomment the above line for DB connection");

        mongoose.connect('mongodb://localhost:27017/blogsDB',(err)=>{
            if(err){
                console.log("Error in connecting to DB");
            }else{
                console.log("Successfully connected to DB");
            }
        })
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