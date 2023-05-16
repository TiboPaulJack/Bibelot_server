// here we defenied the function that will be used to create a new user
const userDatamapper = require("../datamappers/userDatamapper");
const debug = require("debug")("3db: newUser");
const badInputError = require("./errorControl/badInputError");
const bcrypt = require("bcrypt");
const sendMail = require("./nodemailer");

/**
 * @description - function for create a new user
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next middleware
 * @param {object} body - body of the request
 * @returns {object} - return an object with the user created
 */
const add = async (req, res, next, body) => {
  const { pseudo, email, password, firstname, lastname, picture } = body;

  // CHECK IF THE EMAIL IS ALREADY USED
  const emailCheck = await userDatamapper.getAll({ email });

  if (emailCheck.length > 0) {
    // ERR IF THE EMAIL IS ALREADY USED
    const err = new badInputError("This email is already used");
    next(err);
  }

  // CHECK IF THE PSEUDO IS ALREADY USED
  const pseudoCheck = await userDatamapper.getAll({ pseudo });

  if (pseudoCheck.length > 0) {
    // ERR IF THE PSEUDO IS ALREADY USED
    const err = new badInputError("This pseudo is already used");
    next(err);
  }

  // IF EMAIL AND PSEUDO ARE NOT USED
  // HASH THE PASSWORD

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userDatamapper.create({
    pseudo,
    email,
    password: hashPassword,
    firstname,
    lastname,
    picture,
  });

  return {
    pseudo: user.pseudo,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    picture: user.picture,
  };
};

/**
 * @description - export the function add
 */
module.exports = add;
