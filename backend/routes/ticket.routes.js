const express = require("express");
const ticketController = require("../controllers/ticket.controller");
const validateCreateTicket = require("../middlewares/validateCreateTicket.middleware")
const validateEditTicket = require("../middlewares/validateEditTicket.middleware")
const validateTicketId = require("../middlewares/validateTicketId.middleware")

const router = express.Router();

router.get("/", ticketController.getAllTickets);
router.post("/createTicket", validateCreateTicket.validateCreateTicket ,ticketController.createTicket);
router.delete("/deleteTicket/:id", validateTicketId.validateTicketId ,ticketController.deleteTicket);
router.patch("/editTicket/:id", validateTicketId.validateTicketId ,validateEditTicket.validateEditTicket , ticketController.editTicket);

module.exports = router;