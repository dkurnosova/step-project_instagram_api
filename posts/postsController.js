import PostsModel from "./PostsModel.js";
import { updateLikesSchema} from "./postsValidationSchema.js";

export const getPosts = async (req, res) => {
   try {
      if (req.query.ids) {
         const ids = req.query.ids;
         const idsArray = ids.split(",");
         const posts = await PostsModel.find({ _id: { $in: idsArray } });
         res.json({ status: "success", data: posts });
      } else {
         const { page, limit } = req.query;
         const skip = (page - 1) * limit;
         const posts = await PostsModel.find().skip(skip).limit(3);

         const totalPosts = await PostsModel.countDocuments();
         const hasMore = page * limit < totalPosts;

         posts.forEach((post) => {
            post.comments.reverse();
         });
         res.json({
            status: "success",
            data: posts,
            hasMore,
         });
      }
      } catch (err) {
         res.status(400).json({ status: "error", message: err.message });
      }

};

export const addPost = async (req, res) => {
   try {
      const { userId, likes } = req.body;
      const photo = req.file.buffer;
      const post = await new PostsModel({
         userId,
         photo,
         likes,
      }).save();
      res.json({ status: "success", data: post });
   } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
   }
};

export const editPostLikes = async (req, res) => {
   const postId = req.params.id;
   const { likes } = req.body;
   try {

      const { error } = updateLikesSchema.validate({ likes });

      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }
      
      const post = await PostsModel.findByIdAndUpdate(postId, { likes }, { new: true });

      if (!post) {
         return res.status(404).json({ message: "Post not found" });
      }

      return res.json({ status: "success", data: post });
   } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", message: err.message });
   }
};


export const addComment = async (req, res) => {
   try {
         const postId = req.params.id;
         const comment = {
            userId: req.body.userId,
            text: req.body.text,
         };
         const post = await PostsModel.findById(postId);
         if (!post) {
            return res.status(404).json({ error: "Post not found" });
         }
         post.comments.push(comment);
         await post.save();

         res.json({ status: "success", data: post });
      } catch (err) {
         res.status(500).json({ error: err.message });
      }
   };
