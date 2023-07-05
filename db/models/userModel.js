const path = require('path');
const userRoles = require(path.resolve(__dirname, '..', '..', 'utils','catalogs', 'userRoles'));
const { Model, DataTypes } = require('sequelize');

const USER_TABLE = 'tbl_users';

const UserSchema = {
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
};

class User extends Model {

    static associate(models){
        this.hasMany(models.Task, {
            as: 'createdTasks',
            foreignKey: 'creatorId'
        });
        this.hasMany(models.Task, {
            as: 'AssignedTasks',
            foreignKey: 'responsibleId'
        });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }

}

module.exports = { USER_TABLE, UserSchema, User };
