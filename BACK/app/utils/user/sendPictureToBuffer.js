const fs = require('fs');

function sendPicture(path) {
  try {
    return fs.readFileSync(path);
  } catch (error) {
    console.error(error);
  }
}

module.exports = sendPicture;
