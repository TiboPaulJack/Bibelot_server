require("dotenv").config();
const nodemailer = require("nodemailer");

/**
 * @description - function for send mail to user when is register
 * @method - main
 * @param {string} to - email of user
 * @param {string} subject - subject of mail
 * @param {string} message - message of mail
 * @returns {object} - return a function for send mail
 */
async function main(to, subject, message) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: `${process.env.MAIL}`,
      pass: `${process.env.MAIL_PASSWORD}`,
    },
  });

  let info = await transporter.sendMail({
    from: "api.test.apo@gmail.com", // sender address
    to: `${to}`, // list of receivers
    subject: `${subject}`, // Subject line
    html: `${message}`, // html body
  });
}

/**
 * @description - export main function
 */
module.exports = main;
