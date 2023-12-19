import jwt from "jsonwebtoken"
import User from "../models/User.js"

const jwtsecret = process.env.JWT_SECRET

const isLogged = async (req, res, next) =>{

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        res.status(404).json({ message: ["Acesso negado."]})
        return
    }

    try{
        const verified = jwt.verify(token, jwtsecret)

        req.user = await User.findByPk( verified.id )
        next();
    }
    catch(err){
        res.status(422).json({ message: ["Token inválido."]})
    }

}

export default isLogged