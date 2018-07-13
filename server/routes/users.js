const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController')

/* GET users listing. */
router.get('/', UserController.findAll)
router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)
router.post('/signout', UserController.signOut)
router.post('/loginFb',UserController.loginFb)
router.get('/nyt/:query', UserController.getSearch)

module.exports = router;
