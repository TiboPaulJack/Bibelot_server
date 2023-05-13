const fs = require("fs");
const debug = require("debug")("3db: oldPictureDelete");

const deleteFile = (path) => {
	
	debug("path of DELETE FILE UTILS FN", path)

		fs.unlink(path, (err) => {
				if (err) {
						debug(err);
				}
				debug("old glb deleted");
		})

}


module.exports = deleteFile;
