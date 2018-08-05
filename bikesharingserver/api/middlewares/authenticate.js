let jwt = require ("jsonwebtoken");
let User = require ('../models/userModel');

exports.authorization = (req, res, next) => {
  const header = req.headers.authorization;
  let token;
  if (header) token = header;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: "Invalid token" });
      } else {
        User.findOne({ phoneNumber: decoded.phoneNumber }).then(user => {
          req.currentUser = user;
          next();
        });
      }
    });
  } else {
    res.status(401).json({ errors: "No token"  });
  }
};
