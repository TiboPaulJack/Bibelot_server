const express = require("express");

const modelController = require("../controllers/modelController");
const handlerController = require("../controllers/handlerController");
const validator = require("../utils/validation/middlewareValidation");
const schema = require("../utils/validation/schema");
const errorHandler = require("../utils/errorControl/errorHandler");
const debug = require("debug")("3db: routers");
const path = require("path");
const multer = require("multer");
const tokenCheck = require("../utils/middlewares/tokenCheck");
const isUserConnected = require("../utils/middlewares/isUserConnected");

const router = express.Router();

// ************************ */

const uploadPath = path.join("uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    debug(req.body, "req.body FIRST MULTER");
    cb(null, uploadPath);
  },
});

const upload = multer({ storage: storage });

// ************************ */

/**
 * @description - route for add a model
 * @method - POST
 * @param {string} "/add" - path for add a model
 * @param {function} upload.fields - multer config for upload files
 * @param {function} validator - middleware for validate the body
 * @param {function} handlerController - middleware for handle the controllerp
 * @param {function} modelController.create - controller for create a model
 * @param {function} tokenCheck - middleware for check the token
 * @returns {object} - return an object with the model created
 */
router.post(
  "/add",
  tokenCheck,
  validator(schema.model_create),
  handlerController(modelController.create.bind(modelController))
);

router.get(
  "/search",
  handlerController(modelController.search.bind(modelController))
);

/**
 * @description - route for get all models
 * @method - GET
 * @param {string} "/" - path for get all models
 * @param {function} handlerController - middleware for handle the controller
 * @param {function} modelController.getAll - controller for get all models
 * @returns {object} - return an object with all models
 */
router.get(
  "/",
  isUserConnected,
  handlerController(modelController.getAll.bind(modelController))
);

/**
 * @description - route for get a model data
 * @method - GET
 * @param {string} "/:id" - path for get a model data
 * @param {function} handlerController - middleware for handle the controller
 * @param {function} modelController.getData - controller for get a model data
 * @returns {object} - return an object with the model data
 */
router.get(
  "/data/:id",
  handlerController(modelController.getOne.bind(modelController))
);

/**
 * @description - to update a model
 * @method - PATCH
 * @param {string} "/:id" - path for update a model
 * @param {function} handlerController - middleware for handle the controller
 * @param {function} modelController.update - controller for update a model
 * @param {function} tokenCheck - middleware for check the token
 * @returns {object} - return an object with the model updated
 */
router.patch(
  "/:id",
  tokenCheck,
  validator(schema.model_update),
  handlerController(modelController.update.bind(modelController))
);

/**
 * @description - route for delete a model
 * @method - DELETE
 * @param {string} "/:id" - path for delete a model
 * @param {function} handlerController - middleware for handle the controller
 * @param {function} modelController.delete - controller for delete a model
 * @param {function} tokenCheck - middleware for check the token
 * @returns {object} - return an object with the model deleted
 */
router.delete(
  "/:id",
  tokenCheck,
  handlerController(modelController.delete.bind(modelController))
);

/**
 * @description - use the errorHandler middleware
 * @param {function} errorHandler - middleware for handle the errors, see utils/errorControl/errorHandler.js
 * @returns {object} - return an object with the error
 */
router.use(errorHandler);

/**
 * @description - export the router
 */
module.exports = router;
