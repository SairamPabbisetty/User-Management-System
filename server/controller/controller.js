var Userdb = require('../model/model')

exports.create = (req, res)=>{
    if(!req.body) {
        res.status(400).send({message: "Content cannot be empty"})
        return;
    }

    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    user
        .save()
        .then(data=>{
            res.redirect('/')
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Error occured - create"
            })
        })
}

exports.find = (req, res)=>{
    if(req.query.id) {
        const id = req.query.id
        Userdb.findById(id)
            .then(data=>{
                if(!data) {
                    res.status(400).send({message: "User not found"})
                } else {
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({
                    message: err.message || "Error occured - find"
                })
            })
    } else {
        Userdb.find()
            .then(user=>{
                res.send(user)
            })
            .catch(err=>{
                res.status(500).send({
                    message: err.message || "Error occured - find"
                })
            })
    }
}

exports.update = (req, res)=>{
    if(!req.body) {
        return res.status(400).send({message: "Content cannot be empty"})
    } 

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data=>{
            if(!data) {
                res.status(400).send({message: "User not found"})
            } else {
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "Error occured - update"})
        })
}

exports.delete = (req, res)=>{
    if(!req.body) {
        return res.status(400).send({message: "Content cannot be empty"})
    } 

    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data) {
                res.status(400).send({message: "User not found"})
            } else {
                res.send({message: "Deleted successfully"})
            }
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "Error occured - delete"})
        })
}
