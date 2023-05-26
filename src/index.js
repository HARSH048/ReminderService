const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { PORT } = require("./config/serverConfig");
const { sendBasicEmail } = require("./service/email-service");
const setupAndStartServer = () => {
  app.use(bodyParser.json);
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(`server is started at ${PORT}`);

    sendBasicEmail(
      "support@admin.com",
      "coder9011@gmail.com",
      "this is testing mail",
      "harsh this side"
    );
  });
};

setupAndStartServer();
