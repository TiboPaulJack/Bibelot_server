const coreController = require("./coreController");
const userDatamapper = require("../datamappers/userDatamapper");
const add = require("../utils/newUser");
const debug = require("debug")("3db: userController");
const signin = require("../utils/signin");
sendPictureToBuffer = require("../utils/sendPictureToBuffer");
const oldPictureDelete = require("../utils/oldPictureDelete");
const deleteFile = require( "../utils/deleteModel" );


/**
 * @description - controller for user
 * @class - userController
 * @extends - coreController
 * @personallisedMethods - create, signin, logout, getAll, getOne, delete (this method don't heritate from coreController)
 * @param {object} dataMapper - dataMapper for user
 * @returns {object} - return an instance of userController
 */
class userController extends coreController {
  static dataMapper = userDatamapper;

  constructor() {
    super();
  }

  /**
   * @description - method for create a user
   * @method - create
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with the user created
   */
  async create(req, res, next) {
    debug(req.files.picture);

    let picture = "uploads/avatar/default.png";

    if (req.files && req.files.picture) {
      picture = req.files.picture[0].path;
    }

    const userData = { ...req.body, picture };

    debug("userdata", userData);
    // TODO : RENOMMER LA FONCTION ADD
    const addedUser = await add(req, res, next, userData);
    //we send mail to client forconfirm subscription

    res.status(200).json(addedUser);
  }
  
  async checkOrRenewToken(req, res, next) {
    if(req.decodedId){
      const id = req.decodedId
      const user = await this.constructor.dataMapper.getInfo(id)
      res.status(200).json({message: "token ok", user})
    }else{
      res.status(401).json({message: "token expired"})
    }
  }

  /**
   * @description - method for signin a user
   * @method - signin
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with the user who signin
   */
  async signin(req, res, next) {
    const connectUser = await signin(req, res, next, req.body);
  }

  /**
   * @description - method for logout a user, unused with jwt, but used if we use jwt in cookie
   * @method - logout
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an message for logout
   */
  async logout(req, res, next) {
    //destroy cookie
    res.clearCookie("jwt", { httpOnly: true }).status(200).json("logout OK");
  }

  /**
   * @description - method for get all user
   * @method - getAll
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with all user
   */
  async getAll(req, res, next) {
    const response = await this.constructor.dataMapper.getAll();
    //for all user return we send picture to buffer so we nedd to use a loop for do that

    const allUser = [];

    for (const element of response) {
      const buffer = await sendPictureToBuffer(element.picture);
      const user = {
        id: element.id,
        pseudo: element.pseudo,
        email: element.email,
        firstname: element.firstname,
        lastname: element.lastname,
        created_at: element.created_at,
        picture: buffer,
      };
      allUser.push(user);
    }

    if (response) {
      res.status(200).json(allUser);
    }
  }

  async getInfo(req, res, next) {
    const id = req.decodedId
    const response = await this.constructor.dataMapper.getInfo(id);
    if (response) {
      res.status(200).json(response);
    }
  }

  /**
   * @description - method for get one user
   * @method - getOne
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with getting user
   */
  async getOne(req, res, next,) {
    
    debug("getOne")
    const id = req.decodedId

    const response = await this.constructor.dataMapper.getOne(id);

    if (response instanceof Error) {
      return next(response);
    }
    
    debug("debogage userpicture", response.user.picture)

    const userBuffer = await sendPictureToBuffer(response.user.picture);

    //we nedd to send picture buffer for all model of this user so we use a loop for do that
    const allModel = [];

    for (const element of response.model) {
      const modelBuffer = await sendPictureToBuffer(element.picture);
      const model = {
        id: element.id,
        name: element.name,
        description: element.description,
        format: element.format,
        tag: element.tag,
        created_at: element.created_at,
        likes: element.nombre_de_like,
        comments: element.Commentaires,
        picture: modelBuffer,
      };
      allModel.push(model);
    }

    if (response) {
      const userProfil = {
        pseudo: response.user.pseudo,
        email: response.user.email,
        firstname: response.user.firstname,
        lastname: response.user.lastname,
        picture: userBuffer,
      };

      const completeUser = { userProfil, allModel };
      res.status(200).json(completeUser);
    }
  }

  /**
   * @description - method for delete a user
   * @method - delete
   * @param {object} req - request
   * @param {object} res - response
   * @param {function} next - next middleware
   * @returns {object} - return an object with the user deleted
   */
  async delete(req, res, next) {
    
    if(+req.params.id !== req.decodedId){
      debug("you are not the owner of this account")
      return next(new Error("you are not the owner of this account")
    )
    }
    // DB search for all models of this user
    // to find and delete glb and png files that are in the Uploads folder
    const filesToDelete = await this.constructor.dataMapper.getUserModels(req.params.id);
    
    if(filesToDelete instanceof Error){
      return next(filesToDelete)
    }
    
    const response = await this.constructor.dataMapper.delete(req.params.id);
    
    if(response instanceof Error){
      return next(response)
    }
    
    if(filesToDelete.length !== 0) {
      const modelPath = filesToDelete[0].data;
      const picturePath = filesToDelete[0].picture;
      
      deleteFile( modelPath );
      deleteFile( picturePath );
    }
    deleteFile(response.picture);
    
    const deleteUser = {
      message: "User deleted",
      response,
    };

      res.status(200).json(deleteUser);
  }
}

/**
 * @description - export an instance of userController
 */
module.exports = new userController();