import Post from "@/resources/post/post.interface";
import {Schema,model} from "mongoose";

const PostSchema =new Schema({
    title:{
        type:String,
        required : true
    },
    tags : Array<String>(),
    image:{
        type:String,
    },
    description : {
        type : String,
        // required : true,
    },
    date : {
        type : Date,
        default :()=>Date.now(),
    },
    isPublic : {
        type:Boolean,
        default : false,
    },
    user_id : {
        type : String,
    }
});

export default model<Post>('post',PostSchema);