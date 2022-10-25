import HttpException from "@/utils/exceptions/http.exception";
import {Request,Response,NextFunction} from "express";

function ErrorMiddleware(error:HttpException,req:Request,res:Response,_next:NextFunction):void
{
    const status = error.status || 500;
    const message = error.message || "Something went wrong";

    res.status(status).json({
        status,
        message
    });
}

export default ErrorMiddleware;