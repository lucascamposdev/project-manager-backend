import { Router } from "express";
const router = Router();

import isLogged from "../middlewares/isLogged.js";
import isAdmin from '../middlewares/isAdmin.js'
import validate from '../middlewares/Validate.js'

import { 
    userCreateValidation,
    userLoginValidation,
    userUpdateValidation
 } from "../middlewares/UsersValidation.js";

import {
    userById,
    profile,
    register,
    login,
    update,
}   from '../controllers/UserController.js'

/* Endpoints Prefix: /api/users ... */
router.get('/:id', isLogged, userById)
router.get('/profile/:id', isLogged, profile)
router.post('/register', userCreateValidation(), validate, register)
router.post('/login', userLoginValidation(), validate, login)
router.put('/', isLogged, userUpdateValidation(), validate, update)

export default router;