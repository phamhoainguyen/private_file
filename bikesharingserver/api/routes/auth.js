let express = require( "express");
let auth = require( "../controllers/authController");

const router = express.Router();

router.post("/", auth.isValidPassword);

router.post("/confirmation", auth.confirm);

router.post("/validate_token", auth.validateToken);

module.exports = router;