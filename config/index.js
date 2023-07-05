require('dotenv').config();

const config = {
    isProd: process.env.NODE_ENV === 'production',
    dbUrl: process.env.DATABASE_URL,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    samplePassword: process.env.SAMPLE_PASSWORD
};

module.exports = config;
