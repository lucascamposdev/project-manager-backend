import Task from '../models/Task.js'
import Project from '../models/Project.js'


export const getTask = async(req, res) =>{
    const { id } = req.params

    const found = await Task.findByPk(id)

    if(!found){
        res.status(404).json({message:[ "Task não encontrada." ]})
        return
    }

    res.status(200).json({
        project: found
    })
}

export const create = async(req, res) =>{
    const { id } = req.params
    const { name, description } = req.body

    const foundProject = await Project.findByPk(id)

    if(!foundProject){
        res.status(404).json({message:[ "Projeto não encontrado." ]})
        return
    }

    const newTask = await Task.create({
        name,
        description,
        status: 0,
        projectId: id,
    })

    if(!newTask){
        res.status(422).json({ message: ["Ocorreu um erro, tente mais tarde."] })
        return
    }

    res.status(200).json({ 
        project: newTask 
    })
}

export const deleteTask = async(req, res) =>{

    const { id } = req.params

    const deletedTask = await Task.destroy({ where: {id}})

    if(!deletedTask){
        res.status(404).json({message:[ "Task não encontrada." ]})
        return
    }

    res.status(200).json({ 
        taskId: id,
        message: ['Task excluída com sucesso!']
    })
}

export const applyOnTask = async(req, res) =>{

    const { id } = req.params
    const reqUser = req.user
    
    const found = await Task.findByPk(id)

    if(!found){
        res.status(404).json({message:[ "Task não encontrada." ]})
        return
    }

    if(found.userId){
        res.status(422).json({message:[ "Essa Task já possui um responsável." ]})
        return
    }

    found.userId = reqUser.id
    found.status = 1
    found.save()

    res.status(200).json({
        project: found
    })
}

export const finalize = async(req, res) =>{

    const { id } = req.params
    const reqUser = req.user
    
    const found = await Task.findByPk(id)

    if(!found){
        res.status(404).json({message:[ "Task não encontrada." ]})
        return
    }

    if(found.userId != reqUser.id){
        res.status(422).json({message:[ "Apenas o responsável pela Task pode finalizá-la." ]})
        return
    }

    found.status = 2
    found.save()

    res.status(200).json({
        project: found
    })
}