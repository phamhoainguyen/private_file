'use strict';

let mongoose = require('mongoose');
let User = require('../models/userModel');
//let User = mongoose.model('User');

exports.getAllUser = function (req, res) {
    User.find({ 'isDelete': 0 }, 'userID name phoneNumber city birdYear gender profileImg email', function (err, user) {
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(401).json(err);
        }
    });
};

exports.getUserByUserID = function (req, res) {
    User.findOne({ 'userID': parseInt(req.params.id) , 'isDelete': 0 }, 'userID name phoneNumber city birdYear gender profileImg email', function (err, user) {
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(401).json(err);
        }
    });
};

exports.createUser = function (req, res) {
    let newUser = new User(req.body);
    let password = req.body.password;
    newUser.setPassword(password);
    newUser.setConfirmationToken();
    newUser.save(function (err, user) {
        if (user) {
            res.status(200).json(user.toAuthJSON());
        }

        else {
            res.status(401).json(err);
        }
    });
};


exports.updateUser = function (req, res) {
    User.findOneAndUpdate({'userID': parseInt(req.params.id) }, req.body, { new: true }, (err, user) => {
        if (user) {
            res.status(200).json(user.userID);
        }
        else {
            res.status(401).json(err);
        }
    });
};

exports.deleteUser = function (req, res) {
    User.findOneAndUpdate({ 'userID': parseInt(req.params.id) }, { $set: { "isDelete": 1 } }, { new: true }, (err, user) => {
        if (user) {
            res.status(200).json(user.userID);
        }
        else {
            res.status(401).json(err);
        }
    });
};

////////////////////// JSON WEB TOKEN///////////////////////
// module.exports.authenticate = function(req, res ){
//     // co user moi tao duoc token

// }