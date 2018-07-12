const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController')

/* GET users listing. */
router.get('/', UserController.findAll)
router.post('/signup', UserController.signUp)

module.exports = router;
