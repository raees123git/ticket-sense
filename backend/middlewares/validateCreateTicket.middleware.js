const AppError = require("../errors/app-error");

function validateCreateTicket(request, response, next){
    
    const { title, description, customerName, status, priority } = request.body;

    if (title != undefined && !title.trim()){
        throw new AppError("title sae se dhalo bhai..",400);
    }

    if (description != undefined && !description.trim()){
        throw new AppError("Description cannot be empty.",400);
            }

    if (customerName != undefined && !customerName.trim()){
            throw new AppError("Customer name cannot be empty",400);
            }

    if(status != undefined && !status.trim()){
            throw new AppError("status cannot be empty.",400);
            }

    if(priority != undefined && !priority.trim()){
            throw new AppError("Priority cannot be empty.",400);
            }

    next()
        }


module.exports = {
    validateCreateTicket
}