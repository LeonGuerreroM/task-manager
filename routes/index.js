const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const taskRouter = require('./taskRouter');

function routesSetup(app){
    app.use('/task-manager/api/v1', router);
    router.use('/users', userRouter);
    router.use('/auth', authRouter);
    router.use('/tasks', taskRouter);
}

module.exports = routesSetup;
