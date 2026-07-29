async function getAllTickets(){
    response = await fetch("http://localhost:3000/tickets");

    data = await response.json();
    console.log(data)
}

// getAllTickets();

async function getTicketByID(ticketID){
    response = await fetch(`http://localhost:3000/tickets/${ticketID}`);

    data = await response.json();

    console.log(data);
}

// getTicketByID(3);

async function createTicket(){
    const ticket = {
        id: "",
        title: "button issue",
        description: "I cannot click the button.",
        customerName: "Arham",
        status: "OPEN",
        priority: "LOW",
    }

    try{
        response = await fetch(`http://localhost:3000/tickets/createTicket/${ticket.id}`, {
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

        console.log("deleted ticket is: ",data);

    }catch (error){
        console.error("error is: ",error.message);
    }
}

// deleteTicket(2)


async function editTicket(){
    ticket = {
        id:5,
        title: "button issue",
        description: "",
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

editTicket();