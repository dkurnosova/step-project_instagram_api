import Joi from "joi";

export const postsValidationSchema = Joi.object({
   userId: Joi.string().required(),
   photo: Joi.binary(),
   likes: Joi.array().items(Joi.string()),
   comments: Joi.array().items(
      Joi.object({
         userId: Joi.string(),
         text: Joi.string(),
      })
   ),
});

export const updateLikesSchema = Joi.object({
   likes: Joi.array().items(Joi.string()).required(),
});

export const commentSchema = Joi.object({
   userId: Joi.string().required(),
   text: Joi.string().required(),
});
