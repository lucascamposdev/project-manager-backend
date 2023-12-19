import { body } from "express-validator";

export const projectCreateValidation = () =>{
    return [
        body("name")
            .isString()
            .withMessage("Nome do projeto é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("Nome do projeto deve possuir no mínimo 3 caracteres."),
        body("client")
            .isString()
            .withMessage("Nome do cliente é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("Nome do cliente deve possuir no mínimo 3 caracteres."),
    ]
}

export const projectUpdateValidation = () =>{
    return [
        body("name")
            .isString()
            .withMessage("Nome do projeto é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("Nome do projeto deve possuir no mínimo 3 caracteres."),
        body("client")
            .isString()
            .withMessage("Nome do cliente é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("Nome do cliente deve possuir no mínimo 3 caracteres."),
    ]
}
