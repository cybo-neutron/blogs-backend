import jwt from 'jsonwebtoken';
import { Token } from './interfaces/token.interface';

export function createToken(user:any):string{
    const token = jwt.sign({id:user._id,name:user.name,email:user.email},process.env.JWT_SECRET as jwt.Secret,{expiresIn:'1d'});

    return token;
}

export async function verifyToken(token:string) : Promise<Token|jwt.VerifyErrors>  {
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET as jwt.Secret );
        return decoded as Token;
    }catch(err:any){
        throw new Error("Invalid token");
    }
    
}


export default {createToken,verifyToken};