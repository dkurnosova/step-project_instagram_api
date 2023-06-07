import Joi from 'joi'

const usersValidationSchema = Joi.object({
   name: Joi.string().required(),
   icon: Joi.binary(),
   subscriptions: Joi.array().items(Joi.string()),
   posts: Joi.array().items(Joi.string()),
});

export const updateSubscribersSchema = Joi.object({
   subscriptions: Joi.array().items(Joi.string()).required(),
});

export default usersValidationSchema