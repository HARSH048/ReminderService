const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { PORT } = require("./config/serverConfig");
//const { sendBasicEmail } = require("./service/email-service");
const TicketController = require("./controller/ticket-controller");
const jobs = require("./utils/job");
const { REMINDER_BINDING_KEY } = require("./config/serverConfig");
const EmailService = require("./service/email-service");
const { subscribeMessage, createChannel } = require("./utils/messageQueue");
const setupAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post("/reminderservice/api/v1/tickets", TicketController.create);

  const channel = await createChannel();
  subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);
  app.listen(PORT, () => {
    console.log(`server is started at ${PORT}`);
    console.log(new Date());
    //jobs();
    // sendBasicEmail(
    //   "support@admin.com",
    //   "coder9011@gmail.com",
    //   "this is testing mail",
    //   "harsh this side"
    // );
  });
};

setupAndStartServer();
