import { Router } from "express";
const router = Router();

import isLogged from "../middlewares/isLogged.js";
import checkAcess from "../middlewares/checkAcess.js";
import validate from '../middlewares/Validate.js'

import { 
    getTask,
    create,
    deleteTask,
    applyOnTask,
    changeTaskStatus,
    update,
    leaveTask
 } from "../controllers/TaskController.js";
 
import { 
    taskCreateValidation
 } from "../middlewares/TaskValidation.js";

/* Endpoints Prefix: /api/tasks ... */
router.get('/:id', isLogged, getTask)
router.post('/:id', isLogged, checkAcess, taskCreateValidation(), validate, create)
router.delete('/:id', isLogged, checkAcess, deleteTask)
router.patch('/apply/:id', isLogged, applyOnTask)
router.patch('/leave/:id', isLogged, leaveTask)
router.patch('/change/:id', isLogged, changeTaskStatus)
router.patch('/update/:id', isLogged, update)

export default router;