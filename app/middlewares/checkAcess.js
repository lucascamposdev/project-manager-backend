const checkAcess = async(req, res, next) =>{
    const reqUser = req.user

    if(reqUser.access === 1){
        return res.status(422).json({
            message: ["Você não tem acesso para essa atividade."]
        })
    }

    next();
}

export default checkAcess