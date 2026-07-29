const ticketService = require("../services/ticket.service");

function getAllTickets(request, response) {
  const tickets = ticketService.AllTickets();

  return response.status(200).json(tickets);
}

function getTicketByID(request, response, next){
    const ticketID = Number(request.params.id);
    try{
      const ticket = ticketService.TicketById(ticketID);
      return response.status(200).json(ticket);
    }catch (error){
      return next(error)
    }
}

function createTicket(request, response){
  const newTicket = request.body;
  const createdTicket = ticketService.createTicket(newTicket);
  return response.status(200).json(createdTicket);
}


function deleteTicket(request, response, next){
  const ticketID = Number(request.params.id);

  try{
    const deletedTicket = ticketService.deleteTicket(ticketID);
    return response.json(deletedTicket);
  }catch (error){
    return next(error)
  }
}



function editTicket(request, response, next){
  const ticketID = Number(request.params.id);
  const editTicketData = request.body;

  try{
  const edittedTicket = ticketService.editTicket(ticketID, editTicketData);
  response.status(200).json(edittedTicket);
  }catch (error){
    return next(error);
  }
}

module.exports = {
  getAllTickets,
  getTicketByID,
  createTicket,
  deleteTicket,
  editTicket
};