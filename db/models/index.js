const { User, UserSchema } = require('./userModel');
const { Task, TaskSchema } = require('./taskModel');
const { TaskSharing, TaskSharingSchema } = require('./taskSharingModel');

function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize));
    Task.init(TaskSchema, Task.config(sequelize));
    TaskSharing.init(TaskSharingSchema, TaskSharing.config(sequelize));

    User.associate(sequelize.models);
    Task.associate(sequelize.models);
}

module.exports = setupModels;
