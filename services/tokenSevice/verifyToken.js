const checkAuthority = require("./checkAuthority.js");

const jwt_decode = require("jwt-decode");

//importing jwt to use jwt features
const jwt = require("jsonwebtoken");

//importing logger module
const logger = require("../../logger");

//importing config file modules to call value from config file
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("config/app.properties");

//importing dynamic values from config file
const JWT_SECRET = properties.get("JWT_SECRET");

//method to verify jwt token
function auth(req, res, next) {
  //fetching token from request header
  const token = req.header("auth-token");

  var decoded = jwt_decode(token);

  var isAllowed = checkAuthority(decoded.userType, req.url);

  if (!isAllowed) return res.status(401).send("Acess Denied");

  //if empty token send exit block
  if (!token) return res.status(401).send("Acess Denied");

  try {
    //verifying jwt token
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    //error handling
    logger.info("Request with Invalid Token");
    res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
