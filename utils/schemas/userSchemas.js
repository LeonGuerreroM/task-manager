const Joi = require('@hapi/joi');

const username = Joi.string().min(1).max(25);
const password = Joi.string().min(8).max(50);
const passwordConfirmation = Joi.string().min(8).max(50);

const createUserSchema = Joi.object({
    username: username.required(),
    password: password.required(),
    passwordConfirmation: passwordConfirmation.required()
});

module.exports = { createUserSchema };
