
import { loginResponse } from "@/utils/definitions/login";
import token from "@/utils/token";
import User from "./user.interface";
import UserModel from "./user.model";

class UserService{
    private user = UserModel;

    //Register
    public async register(
        name:string,
        email:string,
        password:string,
    ):Promise<loginResponse|Error>{

        try{
            const user = await this.user.create({name,email,password});
            
            const accessToken = token.createToken(user);
            
            const data:loginResponse ={
                token:accessToken,
                name:user.name,
                email:user.email,
                user_id:user._id
            }

            return data;
        }catch(err:any){
            throw new Error(err.message)
        }
    }

    public async login(
        email:string,
        password : string,
    ) : Promise<loginResponse|Error>{
        console.log({email,password});
        
        try{
            //check if email is present
            const user = await this.user.findOne({email});

            if(!user){
                //todo : change the error message
                throw new Error("No user by this name");
            }
            //verify password
            //if verified -> send the token after logging in.
            
            if(await user.isValidPassword(password)){
                const accessToken = await token.createToken(user);
                const data:loginResponse ={
                    token:accessToken,
                    name:user.name,
                    email:user.email,
                    user_id:user._id
                }
    
                return data;
            }else{
                throw new Error("Wrong Credentials");
            }

        }catch(err){
            console.log(err)
            throw new Error("Unable to login");
        }
    }
}

export default UserService;