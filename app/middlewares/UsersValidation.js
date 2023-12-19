import { body } from "express-validator";

export const userCreateValidation = () =>{
    return [
        body("name")
            .isString()
            .withMessage("Nome obrigatório.")
            .isLength({ min: 3 })
            .withMessage("Nome deve ter no mínimo 3 caracteres."),
        body("email")
            .isString()
            .withMessage("E-mail obrigatório.")
            .isEmail()
            .withMessage("Insira um e-mail válido."),
        body("password")
            .isString()
            .withMessage("Senha obrigatória.")
            .isLength({ min: 6 })
            .withMessage("A Senha deve ter no mínimo 6 caracteres."),
        body("confirmPassword")
            .isString()
            .withMessage("Confirmação de senha é obrigatória.")
            .custom((value, { req }) =>{
                if(value != req.body.password){
                    throw new Error("As senhas não coincidem.")
                }
                return true;
            })
    ]
}

export const userLoginValidation = () =>{
    return [
        body("email")
            .isString()
            .withMessage("E-mail obrigatório.")
            .isEmail()
            .withMessage("Insira um e-mail válido."),
        body("password")
            .isString()
            .withMessage("Senha obrigatória."),
    ]
}


export const userUpdateValidation = () =>{
    return [
        body("name")
            .optional()
            .isLength({ min: 3})
            .withMessage("Nome precisa ter no mínimo 3 caracteres."),
        body('password')
            .optional()
            .isLength({ min: 6 })
            .withMessage('Senha precisa ter no mínimo 6 caracteres.')
            .custom((value, { req }) => {
              if (req.body.password && !req.body.confirmPassword) {
                throw new Error('Confirme a senha.');
              }
      
              if (req.body.password !== req.body.confirmPassword) {
                throw new Error('As senhas não coincidem.');
              }
      
              return true;
            }),
    ]
}