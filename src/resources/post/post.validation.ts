import Joi from 'joi';

const create = Joi.object({
    title : Joi.string().required(),
    tags : Joi.array<string>(),
    description : Joi.string().required(),
    date : Joi.date().default(Date.now),
    isPublic:Joi.boolean().default(false),
    user_id:Joi.string(),
    image:Joi.string().optional().allow('')
});

export default {create};