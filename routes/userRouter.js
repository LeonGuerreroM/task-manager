const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');

const success = require(path.resolve(__dirname, '..', 'utils', 'successResponse'));
const services = require(path.resolve(__dirname, '..', 'services', 'userServices'));
const checkRoles = require(path.resolve(__dirname, '..', 'utils', 'middlewares', 'authorizationHandler'));
const validationHandler = require(path.resolve(__dirname, '..', 'utils', 'middlewares', 'validationHandler'));
const { createUserSchema } = require(path.resolve(__dirname, '..', 'utils', 'schemas', 'userSchemas'));

router.post('/register',
    passport.authenticate('jwt', {session: false}),
    checkRoles('ADMIN'),
    validationHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try{
            const userInfo = req.body;
            const newUser = await services.createUser(userInfo);
            success(res, 201, 'user', newUser, 'user created');
        } catch(error) {
            next(error);
        }
    }
);

module.exports = router;
