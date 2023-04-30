const debug = require("debug")("3db: CoreControllers");
const userDatamapper = require("../datamappers/userDatamapper");
const oldPictureDelete = require("../utils/user/oldPictureDelete");

/**
 * @description - controller for core, basic CRUD class, all other controllers will inherit from this class
 * @class - CoreController
 * @param {object} dataMapper - dataMapper for the controller
 * @returns {object} - return an instance of CoreController
 */
class CoreController {
  static dataMapper;

  /**
   * @description - method for get all
   * @method - getAll
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with all data
   */
  async getAll(req, res, next) {
    const data = req.body;
    const response = await this.constructor.dataMapper.getAll(data);

    if(response instanceof Error) {
      return next(response);
    }
    
    if (response) {
      res.status(200).json(response);
    }
    
    
  }

  /**
   * @description - method for get one
   * @method - getOne
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with one data
   */
  async getOne(req, res, next) {
    const id = req.params.id;

    const response = await this.constructor.dataMapper.getOne(id);
    
    if (response instanceof Error) {
      return next(response);
    }

    if (response) {
      res.status(200).json(response);
    }
  }

  /**
   * @description - method for create
   * @method - create
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with the data created
   */
  async create(req, res, next) {
    debug("create OK");

    const response = await this.constructor.dataMapper.create(req.body);
    
    if(response instanceof Error) {
      return next(response);
    }
    
    if (response) {
      res.status(201).json(response);
    }
  }

  /**
   * @description - method for update
   * @method - update
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with the data updated
   */

  async update(req, res, next) {
    const id = req.decodedId;

    // If the body is empty, returns an error
    if (Object.entries(req.body).length === 0 && req.files.picture === undefined) {
      res.status(400).json({ message: "empty request - execution canceled" });
      return debug("empty request - execution canceled");
    }

    if (req.files.picture) {
      const OldPictureToDelete = await userDatamapper.getProfilePicture(id);
      await oldPictureDelete(OldPictureToDelete);
      req.body.picture = req.files.picture[0].path;
    }

    const response = await userDatamapper.update(req.decodedId, req.body);
    
    if (response instanceof Error) {
      return next(response);
    }
    
    res.status(200).json(response);
  }

  /**
   * @description - method for delete
   * @method - delete
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with the data deleted
   */
  async delete(req, res, next) {
    const response = await this.constructor.dataMapper.delete(req.params.id);

    if (response instanceof Error) {
      return next(response);
    }

    if (response) {
      res.status(200).json(response);
    }
  }
}

/**
 * @description - export CoreController
 */
module.exports = CoreController;
