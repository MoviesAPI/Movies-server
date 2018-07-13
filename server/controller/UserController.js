const mongoose = require('mongoose')
const User = require('../models/user')
const axios = require('axios')
const bcrypt = require('bcrypt')
var jwt = require("jsonwebtoken")
let saltRounds= 10

class UserController {

    static signUp(req, res) {
        User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then(function (dataCreated) {
                res.status(200)
                    .json(dataCreated)
            }).catch(function (err) {
                // console.log('error on signup')
                res.status(400)
                    .json(err)
            })
    }

    static signIn(req, res) {
        let emailUser = req.body.email;
        let pass = req.body.password;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(pass, salt);
        //   console.log('=============>',pass);

        User.findOne({
                email: emailUser
            })
            .then(Users => {
                // console.log(Users);

                let compare = bcrypt.compareSync(pass, Users.password);
                if (compare) {
                    jwt.sign({
                            userId: Users._id
                        },
                        process.env.SECRET,
                        (err, token) => {
                            res.status(200).json({
                                message: "login successfully",
                                token
                            })
                        }
                    );
                }
            })
            .catch(err => {
                res.status(400).json({
                    message: "wrong password/email ",err
                });
            });
    }

    static signOut(req, res) {
        User.findOne({
                email: req.body.email
            })
            .then(function (dataUser) {
                // console.log(dataUser)
                if (dataUser) {
                    User.update({
                        isLogin: false
                    }, function (err, raw) {
                        res.status(200)
                            .json({
                                msg: `${dataUser.name} succeed to logout`
                            })
                    })
                } else {
                    res.status(400)
                        .json({
                            msg: 'wrong email or password'
                        })
                }
            })
            .catch(function (err) {
                // console.log('error on sign out', err)
                res.json(err)
            })
    }

    static findAll(req, res) {
        User.find()
            .then(function (allUser) {
                res.status(200)
                    .json(allUser)
            })
            .catch(function (err) {
                res.status(400)
                    .json(err)
            })
    }

    static getSearch(req, res) { 
        // console.log('something', req.body.search)
            var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
            axios.get(url, {
                headers: {
                    'api-key': "cf9b4f4cd0454fd3b15ac584bcc5dd35",
                    'query': req.body.search
                }
            })
            .then(function(response) {
                console.log('THIS IS RESPONSE', response.data)
                res.json(response.data)
            })
        }

    static loginFb(req, res) {
        let emailUser = req.body.email;
        let pass = req.body.password;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(pass, salt);
        //   console.log('=============>',pass);
      
        User.findOne({
            email: emailUser
          })
          .then(Users => {
            // console.log(Users);
            if (!Users) {
      
              console.log('==========', 'masuks');
              let objUser = {
                
                name: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                
              };
              User.create(objUser)
                .then(Users => {
                  jwt.sign({
                      userId: Users._id
                    },
                    process.env.SECRET,
                    (err, token) => {
                      res.status(200).json({
                        message: "login successfully",
                        token
                      });
                      // console.log(token);
                    }
                  )
                })
                .catch(err => {
                  res.status(400).json({
                    err
                  });
                });
            } else {
              let compare = bcrypt.compareSync(pass, Users.password);
              if (compare) {
                jwt.sign({
                    userId: Users._id
                  },
                  process.env.SECRET,
                  (err, token) => {
                    res.status(200).json({
                      message: "login successfully",
                      token
                    });
                    // console.log(token);
                  }
                );
              }
            }
      
          })
          .catch(err => {
            res.status(400).json({
              message: "wrong password/email "
            });
          });
    }
}

module.exports = UserController