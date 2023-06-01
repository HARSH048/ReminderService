const sender = require("../config/emailConfig");
const TicketRepository = require("../repsitory/ticket-repository");

const ticketRepository = new TicketRepository();
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

const fetchPendingEmails = async (timestamp) => {
  try {
    const response = await ticketRepository.get({ status: "PENDING" });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createNotification = async (data) => {
  try {
    const response = await ticketRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateTicket = async (id, data) => {
  try {
    const response = await ticketRepository.update(id, data);
  } catch (error) {
    console.log(error);
  }
};

const testfun = async (data) => {
  console.log("in the service layer", data);
};

module.exports = {
  sendBasicEmail,
  fetchPendingEmails,
  createNotification,
  updateTicket,
  testfun,
};
