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

const subscribeEvents = async (payload) => {
  let service = payload.service;
  let data = payload.data;
  switch (service) {
    case "CREATE_TICKET":
      await createNotification(data);
      break;

    case "SEND_BASIC_EMAIL":
      await sendBasicEmail(data);
      break;

    default:
      console.log("NO VALID EVENT");
      break;
  }
};

module.exports = {
  sendBasicEmail,
  fetchPendingEmails,
  createNotification,
  updateTicket,
  subscribeEvents,
};
