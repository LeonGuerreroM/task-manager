const path = require('path');
const taskStatus = require(path.resolve(__dirname, '..', '..', 'utils','catalogs', 'tasksStatus'));
const { PENDING, INPROGRESS, DONE, ARCHIVED } = taskStatus;
const { USER_TABLE } = require('./userModel');
const { Model, DataTypes, Sequelize } = require('sequelize');

const TASK_TABLE = 'tbl_tasks';

const TaskSchema = {
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
        onDelete: 'SET NULL'
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
};

class Task extends Model {

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'creatorId', as: 'creator' });
        this.belongsTo(models.User, { foreignKey: 'responsibleId', as: 'responsible' });
        this.belongsToMany(models.User, {
            as: 'sharedWith',
            through: models.TaskSharing,
            foreignKey: 'taskId',
            otherKey: 'userId'
        });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: TASK_TABLE,
            modelName: 'Task',
            timestamps: false
        }
    }

}

module.exports = { TASK_TABLE, TaskSchema, Task };
