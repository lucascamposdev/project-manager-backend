import User from "../models/User.js"
import Task from "../models/Task.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (id) =>{
    return jwt.sign({id}, JWT_SECRET, {
        expiresIn: '7d'
    });
};

export const userById = async(req, res) =>{
    const { id } = req.params

    const found = await User.findByPk(id, 
        {include: ['tasks', 'projects'], 
        attributes: { exclude: ['password'] }
    })

    if(!found){
        res.status(404).json({message:[ "Usuário não encontrado." ]})
        return
    }

    res.status(200).json({
        user: found
    })
}

export const register = async (req, res) =>{  
    const { name, email, password } = req.body

    const alreadyExist = await User.findOne({ where: { email }})
    if(alreadyExist){
        res.status(422).json({message:[ "E-mail já cadastrado." ]})
        return
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
        access: 1
    })

    if(!newUser){
        res.status(422).json({ message: ["Ocorreu um erro, tente mais tarde."] })
        return
    }

    return res.status(200).json({
        id: newUser.id,
        token: generateToken(newUser.id)
    })
}

export const login = async (req, res) =>{

    const { email , password } = req.body

    const foundUser = await User.findOne({ where: { email }})

    if(!foundUser){
        res.status(422).json({ message: ["Credenciais incorretas."]})
        return
    }

    if(!bcrypt.compareSync(password, foundUser.password)){
        res.status(422).json({ message: ["Credenciais incorretas."]})
        return
    }

    return res.status(200).json({
    id: foundUser.id,
    token: generateToken(foundUser.id)
    })
}

export const update = async(req, res) =>{

    const { name, password } = req.body
    const reqUser = req.user

    if(reqUser.email.includes('@test.com')){
        res.status(422).json({message:[ "Contas teste não podem ser alteradas." ]})
        return
    }

    if(name){
        reqUser.name = name
        reqUser.save()
    }

    if(password){
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        reqUser.password = passwordHash
        reqUser.save()
    }

    res.status(200).json({
        user: reqUser,
        message: ['Usuário atualizado com sucesso']
    })
}

export const changeAccess = async(req, res) =>{
    const { id } = req.params
    
    const found = await User.findByPk(id)

    if(!found){
        res.status(404).json({message:[ "Usuário não encontrado." ]})
        return
    }

    found.access = found.access == 1 ? 2 : 1
    found.save()

    res.status(200).json({
        user: found,
        message: [`Acesso de ${found.name} alterado com sucesso!`]
    })
}