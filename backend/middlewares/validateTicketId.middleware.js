const AppError = require("../errors/app-error")

function validateTicketId(request, response, next){
    const ticketId = Number(request.params.id);

    if (Number.isNaN(ticketId) || ticketId <= 0) {
        throw new AppError("You have entered a invalid ticket id..",400);
     }

    next();
}


module.exports = {
    validateTicketId
}