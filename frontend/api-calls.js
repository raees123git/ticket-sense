async function getAllTickets(){
    response = await fetch("http://localhost:3000/tickets?status=OPEN&priority=HIGH&priority=Low");

    data = await response.json();
    console.log(data)
}

getAllTickets();

async function getTicketByID(ticketID){
    response = await fetch(`http://localhost:3000/tickets/${ticketID}`);

    data = await response.json();

    console.log(data);
}

// getTicketByID(2);

async function createTicket(){
    const ticket = {
        title: "Password Problem",
        description: "I forgot my passowrd",
        customerName: "aree",
        priority: "high",
        status:"CLOSE"
    }

    try{
        response = await fetch("http://localhost:3000/tickets/createTicket", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        });

        data = await response.json();
        console.log("created ticket is ", data);
    } catch (error){
        console.error("following error have occured: ",error)
    }   

}

// createTicket()

async function deleteTicket(ticketID){
    try{
        const response = await fetch(`http://localhost:3000/tickets/deleteTicket/${ticketID}`,{
            method: "DELETE"
        });
        
        console.log("deleted ticket response is ", response);
        
        const data = await response.json();
        
        if(!response.ok){
            throw new Error(data.message);
        }

        console.log("deleted ticket is: ",data ,"\nand server code is: ",response.status);

    }catch (error){
        console.error("error is: ",error.message);
    }
}

// deleteTicket(3)


async function editTicket(){
    ticket = {
        id:2,
        title: "button issue",
        description: "buton cannot be clicked by me",
    }

    try{
    response = await fetch(`http://localhost:3000/tickets/editTicket/${ticket.id}`,{
        method:"PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    });

    data = await response.json();

    if(!response.ok){
        throw new Error(`Failed to update ticket. Error message is ${data.message} and error code is ${data.statusCode}`)
    }

    console.log("ticket after editting is: ",data)

    } catch (error) {
        console.error("error is: ",error.message);
    }

    console.log("🚀 The app didn't crash! Moving on to the next task...");
} 

// editTicket();