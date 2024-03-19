import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    favorite: Joi.boolean().optional()
})

export const updateContactSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional()
})

export const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})