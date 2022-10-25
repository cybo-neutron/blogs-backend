import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

class PostService{
    private post = PostModel;


    public async create(title:string,tags:string[],description:string,date:Date,isPublic:boolean,user_id:string) : Promise<Post> {
        console.log("Create post.service");
        
        try{
            const post = await this.post.create({title,tags,description,date,isPublic,user_id});
            // const post = {title,tags,description,date,isPublic,user_id};
            return post;
        }catch(error){
            throw new Error("Unable to create post");
        }
    }

    public async fetchAllPosts() : Promise<Array<Post>>{
        try{
            const posts = await this.post.find({isPublic:true});
            return posts;
        }catch(error){
            throw new Error("Unable to fetch posts");
        }
    }

    public async updatePost(id:string,newData:any):Promise<Post|null>{
        console.log("update post | post.service");
        try{
            // console.log("Data to be updated",{newData});
            const updatedPost = await this.post.findOneAndUpdate({_id :id},newData,{new:true});
            // console.log({updatedPost});
            
            return updatedPost;
        }catch(err){
            throw new Error("Unable to update post");
        }
    }

    public async deletePost(id:string):Promise<Post|null>{
        try{
            const deletedPost = await this.post.findByIdAndDelete(id);
            return deletedPost;
        }catch(err){
            throw new Error("Unable to delete post");
        }
    }

    

}

export default PostService;