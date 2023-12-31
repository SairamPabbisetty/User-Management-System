const axios = require('axios')

exports.homeRoutes = (req, res)=>{
    axios.get('http://localhost:3000/api/users')
        .then((response)=>{
            res.render('index', {users: response.data})
        })
        .catch(err=>{
            res.send(err)
        })
}

exports.add_user = (req, res)=>{
    res.render('add_user')
}

exports.update_user = (req, res)=>{
    axios.get('http://localhost:3000/api/users', {params: {id: req.query.id}})
        .then((user_data)=>{
            res.render("update_user", {user: user_data.data})
        })
        .catch(err=>{
            res.send(err)
        })
}
