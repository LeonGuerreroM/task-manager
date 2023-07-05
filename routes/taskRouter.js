const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const success = require(path.resolve(__dirname, '..', 'utils', 'successResponse'));
const taskServices = require(path.resolve(__dirname, '..', 'services', 'taskServices'));
const validationHandler = require(path.resolve(__dirname, '..', 'utils', 'middlewares', 'validationHandler'));
const { createTaskSchema } = require(path.resolve(__dirname, '..', 'utils', 'schemas', 'taskSchemas'));
const checkRoles = require(path.resolve(__dirname, '..', 'utils', 'middlewares', 'authorizationHandler'));


router.get('/search',
    passport.authenticate('jwt', { session: false }),
    checkRoles('ADMIN'),
    async (req, res, next) => {
        try{
            const filters = req.body;
            const query = req.query
            const result = await taskServices.getTaskList(filters, query)
            res.status(200).json({
                taskList: result.tasks,
                tasksAmount: result.count,
                pages: result.pages,
                message: 'found tasks'
            });
        } catch(error) {
            next(error);
        }
    }
);

router.get('/find-by-title',
    passport.authenticate('jwt', { session: false }),
    checkRoles('ADMIN', 'SUBSCRIBER'),
    async (req, res, next) => {
        try{
            const user = req.user;
            const query = req.query;
            const { title } = req.body;
            const result = await taskServices.getTasksByTitle(title, query, user);
            res.status(200).json({
                taskList: result.tasks,
                tasksAmount: result.count,
                pages: result.pages,
                message: 'found tasks'
            });
        } catch(error) {
            next(error);
        }
    }
);

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles('ADMIN', 'SUBSCRIBER'),
    async (req, res, next) => {
        try{
            const { id: taskId } = req.params;
            const user = req.user;
            const task = await taskServices.getTask(taskId, user)
            success(res, 200, 'task', task, 'found task');
        } catch(error) {
            next(error);
        }
    }
);

router.post('/create',
    passport.authenticate('jwt', { session: false }),
    checkRoles('ADMIN', 'SUBSCRIBER'),
    validationHandler(createTaskSchema, 'body'),
    async (req, res, next) => {
        try{
            const taskInfo = req.body;
            const { sub: userId } = req.user;
            const newTask = await taskServices.createTask(taskInfo, userId) 
            success(res, 201, 'newTask', newTask, 'task created');
        } catch(error) {
            next(error);
        }
    }
);

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles('ADMIN', 'SUBSCRIBER'),
    //validationHandler(createTaskSchema, 'body'),
    async (req, res, next) => {
        try{
            const { id: taskId } = req.params;
            const taskInfo = req.body;
            const user = req.user;
            const updatedTask = await taskServices.updateTask(taskId, taskInfo, user) 
            success(res, 200, 'updatedTask', updatedTask, 'task updated');
        } catch(error) {
            next(error);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles('ADMIN', 'SUBSCRIBER'),
    async (req, res, next) => {
        try{
            const { id: taskId } = req.params;
            const user = req.user;
            const confirmation = await taskServices.deleteTask(taskId, user)
            success(res, 200, 'confirmation', confirmation, 'task deleted');
        } catch(error) {
            next(error);
        }
    }
);

// router.put('/tasks/:id',
//     passport.authenticate('jwt', { session: false }),
//     checkRoles('ADMIN', 'SUBSCRIBER'),
//     async (req, res, next) => {
//         try{
//             const taskInfo = req.body;
//             //const task = await 
//             success(res, 201, 'newTask', newTask, 'task created');
//         } catch(error) {
//             next(error);
//         }
//     }
// );

module.exports = router;
