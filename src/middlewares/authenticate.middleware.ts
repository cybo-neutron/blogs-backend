import userModel from '@/resources/user/user.model';
import HttpException from '@/utils/exceptions/http.exception';
import token from '@/utils/token';
import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {Token} from '@/utils/interfaces/token.interface';

async function authenticateMiddleware(req:Request,res:Response,next:NextFunction){
    const bearer = req.headers.authorization;
    if(bearer && bearer.startsWith('Bearer ')){
        const accessToken = bearer.split(' ')[1];

        const decoded:Token | jwt.JsonWebTokenError  = await token.verifyToken(accessToken);

        if(decoded instanceof jwt.JsonWebTokenError)
        {
            return next(new HttpException(401,"Unauthorized"));
        }

        console.log({decoded});
        const user = await userModel.findById(decoded.id).select('-password').exec();
        console.log("🚀 ~ file: verifyUser.ts ~ line 22 ~ authenticateMiddleware ~ user", user);

        if(!user)
            return next(new HttpException(401,'Unauthorized'));

        req.user = user;
        
        return next();
    }else{
        return next(new HttpException(401,"Unauthorized"));
    }
}

export default authenticateMiddleware;