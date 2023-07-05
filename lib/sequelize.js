const { Sequelize } = require('sequelize');
const path = require('path');
const config = require(path.resolve(__dirname, '..', 'config'));
const setupModels = require(path.resolve(__dirname, '..', 'db', 'models'));

const options = {
    dialect: 'mysql',
    logging: config.isProd ? false : true,
}

if(config.isProd){
    options.dialectOptions = {
        ssl: {
        rejectUnauthorized: false
        }
    }
}

const sequelize = new Sequelize(config.dbUrl, options);


setupModels(sequelize);

module.exports = sequelize;
