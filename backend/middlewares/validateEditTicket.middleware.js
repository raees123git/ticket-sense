const AppError = require("../errors/app-error");

function validateEditTicket(request, response, next){
    const { title, description, customerName, status, priority } = request.body;

    if (title != undefined && !title.trim()){
        // return response.status(400).json("title sae se dhalo bhai");
        throw new AppError("title sae se dhalo bhai..",400);
    }

    if (description != undefined && !description.trim()){
        throw new AppError("Description khali nai hu skti.",400);
    }

    if (customerName != undefined && !customerName.trim()){
        throw new AppError("Customer name cannot be empty",400);
    }

    if(status != undefined && !status.trim()){
        throw new AppError("Status cannot be empty",400);
    }

    if(priority != undefined && !priority.trim()){
        throw new AppError("Priority cannot be empty",400);
    }

    next() 
}

module.exports = {
    validateEditTicket
}