const sender = require("../config/emailConfig");

const sendBasicEmail = async (mailfrom, mailto, mailSubject, mailBody) => {
  try {
    const response = await sender.sendMail({
      from: mailfrom,
      to: mailto,
      subject: mailSubject,
      text: mailBody,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  sendBasicEmail,
};
