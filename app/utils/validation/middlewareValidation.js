const badInputError = require("../errorControl/badInputError");
const debug = require("debug")("app:validation");

/**
 * @description - validation middleware
 * @param {object} schema - schema
 * @returns {function} - return a function
 */
function validation(schema) {
  return async (req, res, next) => {
    let data = req.body;
    data = req.body;

    try {
      const value = await schema.validateAsync(data);

      next();
    } catch (error) {
      const err = new badInputError(error.message);
      next(err);
    }
  };
}
/**
 * @description - export validation
 */
module.exports = validation;
