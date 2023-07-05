const path = require('path');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const sequelize = require(path.resolve(__dirname, '..', 'lib', 'sequelize'));
const tasksStatus = require(path.resolve(__dirname, '..', 'utils', 'catalogs', 'tasksStatus'));
const taskSharingServices = require('./taskSharingServices');

class TaskServices {
    constructor() {}

    async getTaskList(filters, query){
        let whereClause = {
            ...(filters.status && {status: filters.status}),
            ...(filters.isPublic && {isPublic: filters.isPublic}),
        };
        if(filters.keyword){
            const searchCriteria = { [Op.like]: `%${filters.keyword}%` }
            whereClause = { 
                ...whereClause,
                [Op.or]: {
                    title: searchCriteria,
                    description: searchCriteria,
                    comments: searchCriteria
                }
            }
        }
        if(filters.daysToDeadline){
            const daysToDeadlineLeft = filters.daysToDeadline - 2;
            const wantedDeadline = new Date();
            wantedDeadline.setDate(wantedDeadline.getDate() + daysToDeadlineLeft);
            wantedDeadline.setHours(19, 0, 0, 0);
            whereClause = {
                ...whereClause,
                deadline: wantedDeadline
            }
        }

        const options = {
            where: whereClause
        };

        const { limit, offset } = query;
        if(limit && offset){
            options.limit = limit;
            options.offset = offset;
        }
        const { rows: tasks, count } = await sequelize.models.Task.findAndCountAll(options);
        if(!tasks){
            throw boom.notFound('no tasks to show');
        }
        const pages = Math.ceil(count / limit);
        return { tasks, count, pages };
    }

    async getTask(taskId, user){
        const task = await sequelize.models.Task.findByPk(taskId);
        if(!task) throw boom.notFound('not found task');
        if(user.role !== 'ADMIN' && user.sub !== task.creatorId && !task.isPublic)
            throw boom.notFound('not found task');
        return task;
    }

    async getTasksByTitle(title, query, user){
        const options = {
            where: { title: { [Op.like]: `%${title}%` },  }
        };
        const { limit, offset } = query;
        if(limit && offset){
            options.limit = limit;
            options.offset = offset;
        }
        if(user.role !== 'ADMIN'){
            options.where = { 
                ...options.where,  
                [Op.or]: {
                    isPublic: true,
                    creatorId: user.sub
                }
            }
        }
        const { rows: tasks, count } = await sequelize.models.Task.findAndCountAll(options);
        if(!tasks){
            throw boom.notFound('no tasks to show');
        }
        const pages = Math.ceil(count / limit);
        return { tasks, count, pages };
    }

    async createTask(taskInfo, userId){
        taskInfo.status = taskInfo.status ?? tasksStatus.PENDING;
        taskInfo.creatorId = userId;
        let usersToShareWith;
        if(taskInfo.shareWith){
            usersToShareWith = taskInfo.shareWith;
            delete taskInfo.shareWith;
        }
        const transaction = await sequelize.transaction();
        try{
            const newTask = await sequelize.models.Task.create(taskInfo, { transaction });
            if(usersToShareWith) await taskSharingServices.shareTask(newTask.id, usersToShareWith, transaction);
            await transaction.commit();
            return newTask;
        } catch(error) {
            await transaction.rollback();
        }
    }

    async updateTask(taskId, taskInfo, user){
        const task = await this.getTask(taskId, user);
        let usersToShareWith;
        if(taskInfo.shareWith){
            usersToShareWith = taskInfo.shareWith;
            delete taskInfo.shareWith;
        }
        const transaction = await sequelize.transaction();
        try{
            const updatedTask = await task.update(taskInfo);
            if(usersToShareWith) 
                await taskSharingServices.updateTaskSharing(taskId, usersToShareWith, transaction);
            await transaction.commit();
            return updatedTask;
        } catch(error) {
            transaction.rollback();
        }
    }

    async deleteTask(taskId, user){
        const task = await this.getTask(taskId, user);
        task.destroy();
        return true;
    }

}

module.exports = new TaskServices;
