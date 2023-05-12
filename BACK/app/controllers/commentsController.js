const coreController = require("./coreController");
const commentsDatamapper = require("../datamappers/commentsDatamapper");
const debug = require("debug")("app:commentsController");

class commentsController extends coreController {
  static dataMapper = commentsDatamapper;

  constructor() {
    debug("commentsController");
    super();
  }

  async getAll(req, res, next) {
    
    const id = req.params.id;
    
    const response = await this.constructor.dataMapper.getAll(id);

    if (response instanceof Error) {
      return next(response);
    }
  
    res.status(200).json(response);
  }

  async create(req, res, next) {
    

    if (!req.body.content) {
      return next(new Error("No content provided"));
    }

    const user_id = req.decodedId;
    const content = req.body.content;
    const model_id = req.body.model_id;

    const data = {
      user_id,
      content,
      model_id,
    };
    const response = await this.constructor.dataMapper.create(data);

    if (response instanceof Error) {
      return next(response);
    }

    res.status(201);
  }
}

module.exports = new commentsController();
