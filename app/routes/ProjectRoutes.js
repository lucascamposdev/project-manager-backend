import { Router } from "express";
const router = Router();

import isLogged from "../middlewares/isLogged.js";
import checkAcess from "../middlewares/checkAcess.js";
import validate from '../middlewares/Validate.js'

import { 
    allProjects, 
    projectById,
    projectTasks,
    create,
    deleteProject,
    update,
} from "../controllers/ProjectController.js";

import { 
    projectCreateValidation,
    projectUpdateValidation 
} from '../middlewares/ProjectsValidation.js'

/* Endpoints Prefix: /api/projects ... */
router.get('/test', (req, res) =>{
    res.send('Ok')
})
router.get('/', isLogged, allProjects)
router.get('/:id', isLogged, projectById)
router.get('/tasks/:id', isLogged, projectTasks)
router.post('/', isLogged, checkAcess, projectCreateValidation(), validate, create)
router.delete('/:id', isLogged, checkAcess, deleteProject)
router.put('/:id', isLogged, checkAcess, projectUpdateValidation(), validate, update)

export default router;