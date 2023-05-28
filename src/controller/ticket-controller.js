const TicketService = require("../service/email-service");

const create = async (req, res) => {
  try {
    const response = await TicketService.createNotification(req.body);
    return res.status(201).json({
      success: true,
      data: response,
      error: {},
      msg: "successfully registered an email reminder",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: response,
      error: error,
      msg: "unable to register email reminder",
    });
  }
};

module.exports = {
  create,
};
