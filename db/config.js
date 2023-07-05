const path = require('path')
const config = require(path.resolve(__dirname, '..', 'config'));

const URI = config.dbUrl;

module.exports = {
    development: {
        url: URI,
        dialect: 'mysql',
    },

    production: {
        url: URI,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            },
            supportBigNumbers: true,
            bigNumberStrings: true
        }
    },
};
