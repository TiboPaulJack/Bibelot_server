// function for user register
const badInputError = require("./errorControl/badInputError");
const userDatamapper = require("../datamappers/userDatamapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * @description - function for user register, take data in req.body
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next middleware
 * @returns {object} - return an object with the user and a token
 */
const register = async (req, res, next) => {
  const { email, password } = req.body;

  // CHECK IF THE USER EXISTS
  const userCheck = await userDatamapper.getAll({ email });

  // ERR IF THE USER DOESN'T EXIST
  if (userCheck.length === 0) {
    const err = new badInputError("User doesn't exist");
    return next(err);
  }

  // CHECK IF THE PASSWORD IS CORRECT
  const user = userCheck[0];
  const passwordCheck = await bcrypt.compare(password, user.password);

  // ERR IF THE PASSWORD IS INCORRECT
  if (!passwordCheck) {
    const err = new badInputError("Password is incorrect");
    return next(err);
  }
  req.user = user;

  // IF PASSWORD IS CORRECT GENERATE A TOKEN
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ token, userId: user.id, pseudo: user.pseudo });
};

/**
 * @description - export the function
 */
module.exports = register;
