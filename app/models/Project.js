import connection from "../config/connection.js";
import Sequelize from 'sequelize';
import Task from './Task.js'

const Project = connection.define("projects" , {
    name:{
        type: Sequelize.STRING
    }
});

Project.hasMany(Task, { as: 'tasks', foreignKey: 'projectId', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

export default Project;