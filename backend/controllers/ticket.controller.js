const ticketService = require("../services/ticket.service");


async function getAllTickets(request, response, next) {
  try {
    const { status, priority } = request.query;

    const filters = {
      status,
      priority,
    };

    const tickets = await ticketService.getAllTickets(filters);

    return response.status(200).json(tickets);
  } catch (error) {
    return next(error);
  }
}


async function createTicket(request, response, next){
  try{
      const newTicket = request.body;
      const createdTicket = await ticketService.createTicket(newTicket);
      return response.status(201).json(createdTicket);
  }catch (error){
    return next(error);
  }
}


async function deleteTicket(request, response, next){
  const ticketID = Number(request.params.id);

  try{
    const deletedTicket = await ticketService.deleteTicket(ticketID);
    return response.status(200).json(deletedTicket);
  }catch (error){
    return next(error)
  }
}



async function editTicket(request, response, next){
  const ticketID = Number(request.params.id);
  const editTicketData = request.body;

  try{
  const edittedTicket = await ticketService.editTicket(ticketID, editTicketData);
  response.status(200).json(edittedTicket);
  }catch (error){
    return next(error);
  }
}

module.exports = {
  getAllTickets,
  createTicket,
  deleteTicket,
  editTicket
};