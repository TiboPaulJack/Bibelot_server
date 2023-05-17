const debug = require("debug")("3db: tokenCheck");
const tokenError = require("../errorControl/tokenError");
const jwt = require("jsonwebtoken");

/**
 * @description - middleware for check if the user is connected
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next middleware
 * @returns {object} - return an object with the error or pass to next middleware
 */
const tokenCheck = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const err = new tokenError("you need to be connected");
    return next(err);
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (err) {
        const err = new tokenError("invalid or expired token");
        return next(err);
      }
      return decoded;
    }
  );

  if (!decoded) {
    return new tokenError("invalid or expired token");
  }

  req.decodedId = decoded.id;

  next();
};

/**
 * @description - export the middleware tokenCheck
 */
module.exports = tokenCheck;
