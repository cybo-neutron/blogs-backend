import { Document } from "mongoose";

export default interface Post extends Document{
    title: string,
    tags : string[],
    image:string,
    description : string,
    date ?: Date,
    isPublic : boolean,
    user_id : string,   // user_id of the user who created 
}