'use strict';
const path = require('path');
const { DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('../models/userModel');
const { TASK_TABLE } = require('../models/taskModel');
const tasksStatus = require(path.resolve(__dirname, '..', '..', 'utils', 'catalogs', 'tasksStatus'));
const { PENDING, INPROGRESS, DONE, ARCHIVED } = tasksStatus;

module.exports = {

  up: async (queryInterface) => {
    
    await queryInterface.createTable(TASK_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
          allowNull: false,
          type: DataTypes.STRING
      },
      description: {
          allowNull: false,
          type: DataTypes.TEXT
      },
      status: {
          allowNull: false,
          type: DataTypes.ENUM(PENDING, INPROGRESS, DONE, ARCHIVED),
          defaultValue: PENDING
      },
      deadline: {
          allowNull: false,
          type: DataTypes.DATE,
      },
      isPublic: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          field: 'is_public'
      },
      comments: {
          allowNull: true,
          type: DataTypes.TEXT
      },
      creatorId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          field: 'creator_id',
          references: {
              model: USER_TABLE,
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
      },
      responsibleId: {
          allowNull: true,
          type: DataTypes.INTEGER,
          field: 'responsible_id',
          references: {
              model: USER_TABLE,
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
      },
      tags: {
          allowNull: true,
          type: DataTypes.STRING
      },
      createdAt: {
          type: DataTypes.DATE,
          field: 'created_at',
          defaultValue: Sequelize.NOW
      },
      updatedAt: {
          type: DataTypes.DATE,
          field: 'updated_at'
      }
    });
  },


  down: async (queryInterface) => {
    await queryInterface.dropTable(TASK_TABLE);
  }

};
