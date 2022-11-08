import {Request,Response,NextFunction,RequestHandler} from 'express';
import Joi from 'joi';

function validationMiddleware(schema:Joi.Schema) :RequestHandler {
    return async( req:Request,res : Response,next : NextFunction): Promise<void> =>{
        console.log("In middleware");
        console.log(req.body);
        
        try{
            const value = await schema.validateAsync(req.body);
            console.log("🚀 ~ file: validation.middleware.ts ~ line 10 ~ returnasync ~ value", value)
            req.body = value;
            next();
        }catch(err:any){
            console.log(err);
            
            const errors:string[] = [];
            err.details.forEach((error:Joi.ValidationError)=>{
                errors.push(error.message);
            })
            res.status(400).send({errors:errors});
        }
    }
}

export default validationMiddleware;