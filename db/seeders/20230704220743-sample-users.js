'use strict';

const bcrypt = require('bcrypt');
const path = require('path');
const config = require(path.resolve(__dirname, '..', '..', 'config'));
const { USER_TABLE } = require('../models/userModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) { 

    const password = await bcrypt.hash(config.samplePassword, 10);

    const users = [
      { username: 'admin',  password, role: 'ADMIN'},
      { username: 'subscriber1',  password, role: 'SUBSCRIBER'}
    ];

    await queryInterface.bulkInsert(USER_TABLE, users, {});
  },

  async down (queryInterface) { 
    await queryInterface.bulkDelete(USER_TABLE)
  }
};
