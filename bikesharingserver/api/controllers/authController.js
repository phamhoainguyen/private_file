'use strict'

let mongoose = require('mongoose');
let User = require('../models/userModel');
let jwt = require('jsonwebtoken');

//"/"
/**
 * return user khi password và phoneNumber hợp lệ
 */
exports.isValidPassword = (req, res) => {
    //const { credentials } = req.body;
    console.log("da toi ham isValidPassword")
    User.findOne({ phoneNumber: req.body.phoneNumber }).then(user => {
      if (user && user.isValidPassword(req.body.password)) {
        res.status(200).json({ user: user.toAuthJSON() });
      } else {
        res.status(401).json({ errors: "Mật khẩu không đúng!" });
      }
    });
}

//"/confirmation"
/**
 * 
 */
exports.confirm = (req, res) => {
    const token = req.body.token;
    User.findOneAndUpdate(
      { confirmationToken: token },
      { confirmationToken: "", confirmed: true },
      { new: true }
    ).then(
      user =>
        user ? res.status(200).json({ user: user.toAuthJSON() }) : res.status(400).json({})
    );
}


//"validationToken"
/**
 * 
 */
exports.validateToken = (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
        if (err) {
          res.status(401).json({});
        } else {
          res.status(200).json({});
        }
      });
}