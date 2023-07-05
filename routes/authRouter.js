const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const path = require('path');
const config = require(path.resolve(__dirname, '..', 'config'));

const router = express.Router();
const validationHandler = require(path.resolve(__dirname, '..', 'utils', 'middlewares', 'validationHandler'));
const { loginSchema } = require(path.resolve(__dirname, '..', 'utils', 'schemas', 'authSchemas'))

//     /** 
//     * @module AuthRoutes
//     */

//     /**
//    * @name Login
//    * @path {POST} /agave/store/api/v1/auth/login
//    *
//    * @body {String} email
//    * @body {String} password
//    *
//    * @response {Object} object.data logged user data
//    * @response {Object} object.token required access token
//    *
//    * @code {200} successful operation
//    * @code {401} unauthorized
//    * @code {400} wrong body parameters
//    * @code {404} not founded user
//    * @code {500} internal errors with the request
//    *
//    */

router.post('/login',
    validationHandler(loginSchema, 'body'),
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try{
            const user = req.user;
            const payload = {
                sub: user.id,
                role: user.role
            }
            const token = jwt.sign(payload, config.jwtSecret);
            res.status(200).json({
                user,
                token
            });
        }catch(error){
            next(error);
        }
    }
);

module.exports = router;
