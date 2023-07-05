const path = require('path');
const { models } = require(path.resolve(__dirname, '..', 'lib', 'sequelize'));

class taskSharingServices {

    constructor() {}

    async shareTask(taskId, users, transaction){
        try{
            let registerInfo = {
                taskId 
            };
            for(const user of users){
                registerInfo.userId = user;
                await models.TaskSharing.create(registerInfo, { transaction });
            }
        } catch(error) {
            await transaction.rollback();
        }
    }

    async updateTaskSharing(taskId, users, transaction){
        try{
            const taskUserRelations = await models.TaskSharing.findAll({ where: { taskId } });
            if(taskUserRelations){
                for(const relation of taskUserRelations){
                    await relation.destroy({ transaction });
                };
            }
            await this.shareTask(taskId, users, transaction);
        } catch(error) {
            await transaction.rollback();
        }
    }

}

module.exports = new taskSharingServices;