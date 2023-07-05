const { USER_TABLE } = require('./userModel');
const { TASK_TABLE } = require('./taskModel');
const { Model, DataTypes } = require('sequelize');

const TASKSHARING_TABLE = 'rel_tasks_users';

const TaskSharingSchema = {
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
};

class TaskSharing extends Model {

    static config(sequelize){
        return {
            sequelize,
            tableName: TASKSHARING_TABLE,
            modelName: 'TaskSharing',
            timestamps: false
        }
    }

}

module.exports = { TASKSHARING_TABLE, TaskSharingSchema, TaskSharing };
