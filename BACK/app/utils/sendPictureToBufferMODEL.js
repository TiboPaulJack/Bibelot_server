const fs = require("fs");
const NotFoundError = require("./errorControl/notFoundError");
const badInputError = require("./errorControl/badInputError");
const debug = require("debug")("3db: sendPictureToBuffer");

const sendPicture = (path) => {
	const filePath = path;

	return new Promise((resolve, reject) => {
		fs.readFile(filePath, async (err, data) => {
			if (err) {
				return new NotFoundError("Picture not found");
			}

			const buffer = Buffer.from(data, "base64");
			debug(buffer);

			resolve(buffer);
		});
	});
};

module.exports = sendPicture;
