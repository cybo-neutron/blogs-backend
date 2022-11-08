import mongoose from "mongoose";

export default interface User extends mongoose.Document{
    name:string,
    email : string,
    password:string,
    
    isValidPassword(password:string) : Promise<Error|boolean>;
}
