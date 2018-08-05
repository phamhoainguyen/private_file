'use strict';

// module.exports = function(app){
var user = require('../controllers/userController');
var express = require('express');

let router = express.Router();

//router.get('/', todoUser.getAllUser)
router.post('/', user.createUser);

router.get('/:id', user.getUserByUserID)
router.delete('/:id', user.deleteUser)
router.put('/:id', user.updateUser);

module.exports = router;
