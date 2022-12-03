const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  // how to access users cookies in express?
  // cookie-parser
  console.log(req.cookies);
  const token = req.cookies; //req.cookies.token if variable name is same
  // what if there is no token
  if (!token) {
    return res.status(403).send("token is missing");
  }
  // verify token
  try {
    const decode = jwt.verify(token, "shhhhh");
    console.log(decode);
    req.user = decode;
  } catch (error) {
    console.log(error);
    res.status(403).send("token is invalid");
  }
  return next(); // have to write this
};

module.exports = auth;
