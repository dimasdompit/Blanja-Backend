const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = null;
  try {
    token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    req.decoded = decode;
    next();
  } catch (error) {
    console.log(error);
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({
        message: "Token Expired",
      });
    }
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};
