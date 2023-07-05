'use strict';

const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('../models/userModel');
const { TASK_TABLE } = require('../models/taskModel');
const { TASKSHARING_TABLE } = require('../models/taskSharingModel');

module.exports = {

  up: async (queryInterface) => {
    
    await queryInterface.createTable(TASKSHARING_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          field: 'user_id',
          references: {
              model: USER_TABLE,
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
      },
      taskId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          field: 'task_id',
          references: {
              model: TASK_TABLE,
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
      }
    });
  },


  down: async (queryInterface) => {
    await queryInterface.dropTable(TASKSHARING_TABLE);
  }

};
