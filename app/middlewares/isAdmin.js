const isAdmin = async(req, res, next) =>{
    const reqUser = req.user

    if(reqUser.access < 3){
        return res.status(422).json({
            message: ["Apenas o administrador pode realizar esta função."]
        })
    }

    next();
}

export default isAdmin