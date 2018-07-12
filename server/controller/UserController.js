const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRound = 10

class UserController {
    
    static signUp(req, res) {
        User.create({    
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(function(dataCreated) {
            res.status(200)
            .json(dataCreated)
        }).catch(function(err) {
            console.log('error on signup')
            res.status(400)
            .json(err)
        })
    }

    static signIn(req, res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(dataUser) {
            if(dataUser) {
                bcrypt.compare(req.body.password, hash, function(err, res) {
                    if(res) {
                        User.set({isLogin: true})
                        res.status(200)
                            .json({msg: 'succeed login'})
                    } else {
                        res.status(400)
                        .json({msg: 'email or password wrong'})
                    }
                })
            }
        })
        .catch(function(err) {
            console.log('error on sign in')
            res.json(err)
        })
    }

    static findAll(req, res) {
        User.find()
            .then(function(allUser) {
                res.status(200)
                    .json(allUser)
            })
            .catch(function(err){
                res.status(400)
                    .json(err)
            })
    }
}

module.exports = UserController