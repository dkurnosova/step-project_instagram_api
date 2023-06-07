import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
   userId: {
      type: String,
      required: true,
   },
   photo: Buffer,
   likes: [String],
   comments: [
      {
         userId: String,
         text: String,
      },
   ],
});

const PostsModel = mongoose.model("posts", postsSchema);

export default PostsModel;
