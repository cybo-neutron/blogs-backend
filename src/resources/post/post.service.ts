import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

class PostService{
    private post = PostModel;


    public async create(blog:Post) : Promise<Post> {
        console.log("Create post.service");
        
        try{
            const post = await this.post.create(blog);
            return post;
        }catch(error){
            throw new Error("Unable to create post");
        }
    }

    public async fetchAllPostOfUser(user_id:string) : Promise<Array<Post>>{
        try{ 
            const posts = await this.post.find({user_id});
            return posts;
        }catch(error){
            throw new Error("Unable to fetch posts");
        }
    }

    public async fetchAllPublicPosts() : Promise<Array<Post>>{
        console.log("Showing public posts");
        
        try{ 
            const posts = await this.post.find({isPublic:true});
            return posts;
        }catch(error){
            throw new Error("Unable to fetch posts");
        }
    }

    public async fetchPost(id:string) : Promise<Post|null>{
        try{
            const post = await this.post.findById(id);
            return post;
        }catch(error){
            throw new Error("Unable to fetch the post (Check the id)");
        }
    } 

    public async updatePost(id:string,newData:any):Promise<Post|null>{
        console.log("update post | post.service");
        console.log(newData);
        
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