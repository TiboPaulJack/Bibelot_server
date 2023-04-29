// we defined a function for delete old picture when we update picture
const fs = require("fs");
const debug = require("debug")("3db: oldPictureDelete");

//this methode is used for delete old picture path or in this other cas for delete old buffer data

/**
 * @description - delete old picture when user delete profil or update avatar
 * @param {string} oldPicture - old picture path
 * @returns {void}
 */

const oldPictureDelete = async (oldPicture) => {
  try {
    if (oldPicture.picture === "uploads/avatar/default.png") {
      console.debug("SAME");
      return null;
    }
    await fs.promises.unlink(oldPicture.picture);
    debug("old picture deleted");
  } catch (err) {
    console.error(err);
    throw err;
  }
};





/**
 * @description - export oldPictureDelete
 */
module.exports = oldPictureDelete;
