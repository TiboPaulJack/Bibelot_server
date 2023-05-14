const coreController = require("./coreController");
const modelDatamapper = require("../datamappers/modelDatamapper");
const debug = require("debug")("3db: modelController");
const fs = require("fs");
const sendPictureToBuffer = require("../utils/sendPictureToBufferMODEL");
const deleteFile = require("../utils/deleteModel");
const likesDatamapper = require("../datamappers/likesDatamapper");

/**
 * @class modelController
 * @extends coreController
 * @personnalisedMethods - getAll, getGlb, getData, create, update, delete (this methods don't herit from coreController)
 * @description - this class is the controller for the model
 * @param {object} dataMapper - dataMapper for model
 * @returns {object} - return an instance of modelController
 */
class modelController extends coreController {
  static dataMapper = modelDatamapper;
  dataMapper = modelDatamapper;

  /**
   * @description - method for get all models
   * @method - getAll
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with all models
   */
  async getAll(req, res, next) {
    // Check if req.query has category or pseudo
    let response;
    if (
      req.query.hasOwnProperty("category") ||
      req.query.hasOwnProperty("pseudo")
    ) {
      response = await this.dataMapper.getAllModelsByCategoryOrPseudo(
        req.query
      );
      // If not, get all models
    } else {
      response = await this.dataMapper.getAllModels();
    }

    if (response instanceof Error) {
      throw response;
    }

    let likedModels = [];
    const allModels = [];

    // check if the user has liked models
    if (req.decodedId) {
      const id = req.decodedId;
      const idliked = await likesDatamapper.checkIsLiked(id);
      likedModels = idliked.likedmodels;
    }

    // Send all models to buffer
    for (const element of response) {
      const picture = await sendPictureToBuffer(element.picture);

      const model = {
        id: element.id,
        name: element.name,
        category: element.category,
        pseudo: element.pseudo,
        like: element.likes,
        liked: false,
        tags: element.tag,
        picture,
      };

      if (likedModels) {
        likedModels.forEach((id) => {
          if (id === element.id) {
            model.liked = true;
          }
        });
      }

      allModels.push(model);
    }

    res.status(200).json(allModels);
  }

  /**
   * @description - method for get one model glb data
   * @method - getGlb
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with getting model glb data
   */
  async getGlb(req, res, next) {
    const response = await this.dataMapper.getOneModel(req.params.id);

    if (response instanceof Error) {
      return next(response);
    }

    const glb = fs.readFileSync(response.data);

    const object = {
      data: glb,
    };

    res.setHeader("Content-Type", "model/gltf+binary");

    fs.writeFileSync("test.glb", object.data);
    res.sendFile("test.glb", { root: __dirname + "/../../" });
  }

  /**
   * @description - method for get one model data
   * @method - getData
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with getting model data
   */
  async getData(req, res, next) {
    const id = req.params.id;

    const response = await this.dataMapper.getOneModel(id);

    if (response instanceof Error) {
      return next(response);
    }

    res.status(200).json(response);
  }

  async search(req, res, next) {
    const data = Object.values(req.query).toString();

    const response = await this.dataMapper.search(data);

    debug("res", response);

    res.status(200).json(response);
  }

  /**
   * @description - method for add model
   * @method - create
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with the model created
   */
  async create(req, res, next) {
    /*// GET PATH OF THE MODEL AND THE PICTURE
    const pathModel = req.files.data[0].path;
    const pathPicture = req.files.picture[0].path;

    // GET THE EXTENSION OF THE MODEL
    req.body.format = req.files.data[0].mimetype;

    // GET THE SIZE OF THE MODEL
    req.body.size = req.files.data[0].size;

    // ADD THE PATH OF THE MODEL AND THE PICTURE TO THE BODY
    req.body.data = pathModel;
    req.body.picture = pathPicture;*/

    req.body = { ...req.body, user_id: req.decodedId };

    debug();

    const response = await this.dataMapper.create(req.body);

    if (response instanceof Error) {
      deleteFile(pathModel);
      deleteFile(pathPicture);
      return next(response);
    }

    res.status(201).json(response);
  }

  /**
   * @description - method for update model
   * @method - update
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with the model updated
   */
  async update(req, res, next) {
    const response = await this.dataMapper.update(req.params.id, req.body);

    res.status(200).json(response);
  }

  /**
   * @description - method for delete model
   * @method - delete
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with the model deleted
   */
  async delete(req, res, next) {
    const id = req.params.id;

    const findPath = await this.dataMapper.getAll({ id: id });

    const modelPath = findPath[0].data;

    const picturePath = findPath[0].picture;
    debug(picturePath);

    deleteFile(modelPath);
    deleteFile(picturePath);

    if (deleteFile instanceof Error) {
      return next(Error);
    }

    const response = await this.dataMapper.delete(req.params.id);

    res.status(204).json(response);
  }
}

/**
 * @description - export an instance of modelController
 */
module.exports = new modelController();
