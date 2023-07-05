const path = require('path');
const tasksStatus = require(path.resolve(__dirname, '..', 'catalogs', 'tasksStatus'));
const { PENDING, INPROGRESS, DONE, ARCHIVED } = tasksStatus;
const Joi = require('@hapi/joi');

const title = Joi.string().min(1).max(50);
const description = Joi.string().min(1).max(500);
const status = Joi.string().valid(PENDING, INPROGRESS, DONE, ARCHIVED);
const deadline = Joi.date();
const isPublic = Joi.boolean();
const comments = Joi.string().min(1).max(500);
const responsibleId = Joi.number().integer().positive();
const tags = Joi.string().min(1).max(50);
const shareWith = Joi.array().items(Joi.number().integer().positive());

const createTaskSchema = Joi.object({
    title: title.required(),
    description: description.required(),
    status,
    deadline: deadline.required(),
    isPublic: isPublic.required(),
    comments,
    shareWith,
    responsibleId,
    tags
});

module.exports = { createTaskSchema };
