
const coreDatamapper = require("./coreDatamapper");
const notFoundError = require("../utils/errorControl/notFoundError");
const pool = require("../utils/clientConnect");



class commentsDatamapper extends coreDatamapper {
  static tableName = "comment";
  
  constructor() {
    super();
  }
  
  async getAll(id) {
    
    const query = `
        SELECT
          "comment".*,
          "user".pseudo
        FROM "comment"
        LEFT JOIN "user" ON "user".id = "comment".user_id
        WHERE "comment".model_id = $1
        GROUP BY "comment".id, "user".pseudo`
    
    const response = await pool.query(query, [id]);
    
    if(response.rowCount === 0) {
      return new notFoundError("no comment found");
    }
    
    return response.rows;
    
  
  }
  
  
  
}

module.exports = new commentsDatamapper();
