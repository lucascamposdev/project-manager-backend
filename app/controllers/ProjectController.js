import Project from "../models/Project.js"
import Task from "../models/Task.js"

export const allProjects = async(req, res) =>{
    const project = await Project.findAll({ order: [['createdAt', 'ASC']] })

    if(!project){
        res.status(422).json({ message: ["Ocorreu um erro, tente mais tarde."] })
        return
    }

    return res.status(200).json({
        project,
    })
}

export const projectById = async(req, res) =>{
    const { id } = req.params

    const found = await Project.findByPk(id, {include: 'tasks'})

    if(!found){
        res.status(404).json({message:[ "Projeto não encontrado." ]})
        return
    }

    res.status(200).json({
        project: found
    })
}

export const projectTasks = async(req, res) =>{
    const { id } = req.params

    const found = await Task.findAll({where: {projectId: id}, order: [['createdAt', 'ASC']]})

    if(!found){
        res.status(404).json({message:[ "Projeto não encontrado." ]})
        return
    }

    res.status(200).json({
        project: found
    })
}

export const create = async(req, res) =>{
    const { name, client } = req.body
    const reqUser = req.user

    const alreadyExist = await Project.findOne({ where: { name }})
    if(alreadyExist){
        res.status(422).json({message:[ "Já existe um projeto com este nome." ]})
        return
    }

    const newProject = await Project.create({
        name,
        client,
        status: 0,
        userId: reqUser.id
    })

    if(!newProject){
        res.status(422).json({ message: ["Ocorreu um erro, tente mais tarde."] })
        return
    }

    return res.status(200).json({
        project: newProject,
        message: ["Projeto criado com sucesso!"]
    })
}

export const deleteProject = async(req, res) =>{
    const reqUser = req.user
    const { id } = req.params

    const found = await Project.findByPk(id)

    if(!found){
        return res.status(404).json({
            message: ['Projeto não encontrado.']
        })
    }

    if(found.userId != reqUser.id){
        return res.status(422).json({
            message: ['Apenas o líder desse projeto excluí-lo.']
        })
    }

    const deletedProject = await Project.destroy({ where : {id}, cascade: true})

    if(!deletedProject){
        return res.status(404).json({
            message: ['Erro ao excluir projeto.']
        })
    }

    res.status(200).json({
        projectId: id,
        message: ['Projeto excluído com sucesso!']
    })
}

export const update = async(req, res) =>{
    const { name, client } = req.body
    const { id } = req.params

    const found = await Project.findByPk(id, {include: 'tasks'})

    if(!found){
        return res.status(404).json({
            message: ['Projeto não encontrado.']
        })
    }

    if(name){
        found.name = name
        found.save()
    }

    if(client){
        found.client = client
        found.save()
    }

    res.status(200).json({
        project: found,
        message: ['Projeto atualizado com sucesso!']
    })
}

export const finalize = async(req, res) =>{
    const { id } = req.params
    const reqUser = req.user

    const found = await Project.findByPk(id)

    if(!found){
        return res.status(404).json({
            message: ['Projeto não encontrado.']
        })
    }

    if(found.userId != reqUser.id){
        return res.status(422).json({
            message: ['Apenas o líder desse projeto pode encerrá-lo.']
        })
    }

    found.status = found.status == 0 ? 1 : 0
    found.save()

    res.status(200).json({
        project: found,
        message: [found.status == 0 ? 'Projeto Reaberto!' : 'Projeto Finalizado!']
    })
}