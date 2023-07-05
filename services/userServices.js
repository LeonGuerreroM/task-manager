const path = require('path');
const { models } = require(path.resolve(__dirname, '..', 'lib', 'sequelize'));
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UserServices {
    constructor(){}

    async getUser(username){
        const user = await models.User.findOne({ where: { username } });
        if(!username){
            throw boom.notFound('not found user');
        };
        return user;
    };

    async createUser(userInfo){
        if(userInfo.password !== userInfo.passwordConfirmation) throw boom.badData('not matching passwords');
        const infoToRegister = {
            username: userInfo.username,
            password: await bcrypt.hash(userInfo.password, 10)
        }
        const newUser = await models.User.create(infoToRegister);
        delete newUser.password;
        return newUser;
    };

}

module.exports = new UserServices;
