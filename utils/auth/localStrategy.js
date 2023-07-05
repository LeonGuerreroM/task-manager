const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const path = require('path');
const services = require(path.resolve(__dirname, '..', '..', 'services', 'userServices'));

const LocalStrategy = new Strategy(
    async (username, password, done) => {
        try{
            const user = await services.getUser(username);
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                done(boom.unauthorized(), false);
            }
            delete user.dataValues.password;
            done(null, user); 
        }catch(error){
            done(error, false);
        }
    }
);

module.exports = LocalStrategy;