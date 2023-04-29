const CoreDatamapper = require("./coreDatamapper");
const debug = require("debug")("3db: datamapper");
const pool = require("../utils/clientConnect");
const NotFoundError = require("../utils/errorControl/notFoundError");

debug("userDatamapper");
/**
 * @class UserDatamapper
 * @extends CoreDatamapper
 * @personnalisedMethods getOne, update (this methods don't heritate from CoreDatamapper)
 * @description Datamapper for user
 * @param {string} tableName - Name of the table in the database
 * @returns {object} - instance of UserDatamapper
 */

class UserDatamapper extends CoreDatamapper {
  static tableName = "user";
  constructor() {
    super();
  }

  async getProfilePicture(id) {
    const query = `SELECT "picture" FROM "user" WHERE "id" = $1`;
    const response = await pool.query(query, [id]);

    if (response.rowCount === 0) {
      return new NotFoundError("not found");
    }

    return response.rows[0];
  }
  /**
   * @method getOne
   * @description Get one user by id
   * @param {number} id - id of the user
   * @returns {object} - user
   */
  async getOne(id) {
    // first id check
    const idCheck = `SELECT "pseudo", "email", "firstname", "lastname", "picture" FROM "user" WHERE id = $1`;
    const check = await pool.query(idCheck, [id]);

    debug("datamapper check", check.rows);
    if (check.rowCount === 0) {
      return new NotFoundError("user not found");
    }

    const getUserModels = `SELECT model.*, COUNT(model_has_like.model_id) AS nombre_de_like,
        string_agg(comment.content, ', ') AS commentaires
        FROM model
        LEFT JOIN model_has_like ON model_has_like.model_id = model.id
        LEFT JOIN comment ON comment.model_id = model.id
        WHERE model.user_id = $1
        GROUP BY model.id
        ORDER BY model.id;`;

    const response = await pool.query(getUserModels, [id]);
    debug("response", response.rows);
    const user = check.rows[0];
    const model = response.rows;
    return { user, model };
  }

  /**
   * @method update
   * @description Update one user by id
   * @param {number} id - id of the user
   * @param {object} data - data to update
   * @returns {object} - user uptated
   */
  async update(id, data) {
    debug("INCOMING DATA", data);

    const values = [];

    Object.keys(data).forEach((key, index) => {
      values.push(`${key} = $${index + 1}`);
    });

    const query = `
        UPDATE "${this.constructor.tableName}"
        SET ${values.join(", ")}
        WHERE id = $${values.length + 1}`;

    debug("query", query);

    const response = await pool.query(query, [...Object.values(data), id]);

    return response.rows[0];
  }
}

/**
 * @description - Export an instance of UserDatamapper
 */
module.exports = new UserDatamapper();
