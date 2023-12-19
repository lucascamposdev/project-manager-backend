import {Sequelize} from 'sequelize';
import connection from "../config/connection.js";

const Task = connection.define("tasks" , {
    name:{
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.TEXT
    },
    status:{
        type: Sequelize.INTEGER
    }
});


export default Task;