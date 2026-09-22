const AppError = require("../errors/app-error");
const prisma = require("../config/prisma");


async function getAllTickets(filters) {
  const ticketsFromDatabase = await prisma.ticket.findMany({
    where: {
      ...(filters.status !== undefined && {
        status: filters.status,
      }),

      ...(filters.priority !== undefined && {
        priority: filters.priority,
      }),
    },
  });

  return ticketsFromDatabase;
}

async function createTicket(ticketData, loggedInUserId) {
  const newTicket = await prisma.ticket.create({
    data: {
      title: ticketData.title,
      description: ticketData.description,
      customerName: ticketData.customerName,
      status: ticketData.status ?? "OPEN",
      priority: ticketData.priority ?? "MEDIUM",
      userId: loggedInUserId,
    },
  });

  return newTicket;
}


async function deleteTicket(ticketID) {
  const existingTicket = await prisma.ticket.findUnique({
    where: {
      id: ticketID,
    },
  });

  if (!existingTicket) {
    throw new AppError(
      "You have entered an invalid ID. Please enter a valid ticket ID.",
      404
    );
  }

  const deletedTicket = await prisma.ticket.delete({
    where: {
      id: ticketID,
    },
  });

  return deletedTicket;
}


async function editTicket(ticketId, editTicketData){
  const existingTicket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  if (!existingTicket) {
    throw new AppError(
      "You have entered an invalid ID. Please enter a valid ticket ID.",
      404
    );
  }

  const updatedTicket = await prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      ...(editTicketData.title != undefined && { title: editTicketData.title }),
         ...(editTicketData.description !== undefined && {
        description: editTicketData.description,
      }),

      ...(editTicketData.customerName !== undefined && {
        customerName: editTicketData.customerName,
      }),

      ...(editTicketData.status !== undefined && {
        status: editTicketData.status,
      }),

      ...(editTicketData.priority !== undefined && {
        priority: editTicketData.priority,
      }),

    }
  })
  return updatedTicket;
}


module.exports = {
  getAllTickets: getAllTickets,
  createTicket:createTicket,
  deleteTicket:deleteTicket,
  editTicket:editTicket
};
