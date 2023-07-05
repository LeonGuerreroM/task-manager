'use strict';
const path = require('path');
const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('../models/userModel');
const userRoles = require(path.resolve(__dirname, '..', '..', 'utils', 'catalogs', 'userRoles'));

module.exports = {

  up: async (queryInterface) => {
    
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true
      },
      password: {
          allowNull: false,
          type: DataTypes.STRING
      },
      role: {
          allowNull: false,
          type: DataTypes.ENUM(userRoles.ADMIN, userRoles.SUBSCRIBER),
          defaultValue: userRoles.SUBSCRIBER
      }
    });

  },


  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
  }

};
