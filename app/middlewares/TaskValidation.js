import { body } from "express-validator";

export const taskCreateValidation = () =>{
    return [
        body("name")
            .isString()
            .withMessage("Nome da task é obrigatória.")
            .isLength({ min: 3 })
            .withMessage("Nome da task deve possuir no mínimo 3 caracteres."),
    ]
}

export const taskUpdateValidation = () =>{
    return [
        body("name")
            .isString()
            .withMessage("Nome da task é obrigatória.")
            .isLength({ min: 3 })
            .withMessage("Nome da task deve possuir no mínimo 3 caracteres."),
    ]
}


