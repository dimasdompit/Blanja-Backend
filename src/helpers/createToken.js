const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (result, key, expired) => {
    const token = jwt.sign({ result: result }, key, {
      expiresIn: expired,
    });

    return token;
  },
};
