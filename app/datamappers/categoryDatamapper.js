const CoreDataMapper = require("./coreDatamapper");

/**
 * @description Datamapper for category
 * @class CategoryDatamapper
 * @extends CoreDatamapper
 * @personnalisedMethods getAll (this methods don't heritate from CoreDatamapper)
 * @param {string} tableName - Name of the table in the database
 * @returns {object} - instance of CategoryDatamapper
 */
class CategoryDatamapper extends CoreDataMapper {
  static tableName = "category";
  
  constructor() {
    super();
  }
  
}

module.exports = new CategoryDatamapper();
