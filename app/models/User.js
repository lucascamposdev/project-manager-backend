import {Sequelize} from 'sequelize';
import connection from "../config/connection.js";
import Task from './Task.js';
import Project from './Project.js';

const User = connection.define("users" , {
    name:{
        type: Sequelize.STRING
    },
    lastName:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
    access: {
        type: Sequelize.INTEGER
    }
});

User.hasMany(Task, { as: 'tasks', foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'responsable' });

User.hasMany(Project, { as: 'projects', foreignKey: 'userId' });
Project.belongsTo(User, { foreignKey: 'userId' });

export default User;