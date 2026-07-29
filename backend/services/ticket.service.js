const AppError = require("../errors/app-error");

const tickets = [
  {
    id: 1,
    title: "Payment issue",
    description: "My payment was deducted twice",
    customerName: "Nizaqat",
    status: "OPEN",
    priority: "HIGH",
  },
  {
    id: 2,
    title: "Login issue",
    description: "I cannot log into my account",
    customerName: "Ahmed",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
  },
];

function getAllTickets() {
  return tickets;
}


function getTicketByID(ticketId){
    console.log("user is askding for id: ",ticketId)
    const ticket = tickets.find((ticket) => ticket.id === ticketId )
    
    if (!ticket){
      throw new AppError("id ghalat daali hai...",404)
    }

    return ticket;
}


function createTicket(ticket){
  tickets.push(ticket);
  return ticket;
}


function deleteTicket(ticketId){
  console.log('ticketid is: ',ticketId);

  const ticketIndex = tickets.findIndex((ticket) => ticket.id === ticketId)

  if (ticketIndex === -1){
      console.log("ticket index is: ",ticketIndex);
      throw new AppError("ap jo ticket delete krna cha rae hai wo exist nai krta........",404);
  }else{
      const [deletedTIcket] = tickets.splice(ticketIndex,1 );

      console.log("deleted ticket is: ",deletedTIcket);

      return {message: "Ticket deleted successfully",
              deletedTIcket: deletedTIcket
            };
  }

}


function editTicket(ticketID, editTicketData){
  const ticketIndex = tickets.findIndex((ticket) => ticket.id === ticketID)

  if (ticketIndex === -1){
    throw new AppError("You have entered a invalid id, please enter a valid ticket id..",404);
  }
  console.log("edit ticket data is: ",editTicketData);

  let ticket = tickets[ticketIndex];

  console.log("ticket to change original have: ",ticket);

  for (const [key, value] of Object.entries(ticket)) {
    if (key in editTicketData){
      ticket[key] = editTicketData[key];
    }
  }

  console.log("all tickets after edititng is: ",tickets);

  return ticket;
}


module.exports = {
  AllTickets: getAllTickets,
  TicketById: getTicketByID,
  createTicket:createTicket,
  deleteTicket:deleteTicket,
  editTicket:editTicket
};
