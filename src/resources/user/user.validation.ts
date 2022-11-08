import Joi from "joi";

const register = Joi.object({
    name:Joi.string().max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

const login = Joi.object({
    email : Joi.string().required(),
    password:Joi.string(),
})


export default {register,login}