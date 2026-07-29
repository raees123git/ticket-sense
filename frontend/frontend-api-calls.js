async function getAllTickets(){
    response = await fetch("http://localhost:3000/getAllTickets");
    data = await response.json();
    console.log(data)
}

// getAllTickets()

async function createTicket(){

    ticket = {
        id: 3,
        title: "App is crashingg",
        status: "OPEN",
        priority: "Medium"
    }

    response = await fetch("http://localhost:3000/createTicket", {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    })

    data = await response.json();

    console.log(data);
}

// createTicket()


async function deleteTicket(ticketID){
    response = await fetch(`http://localhost:3000/deleteTicket/${ticketID}`, {
        method: "DELETE" 
    });


    console.log(response);
    console.log(`Ticket ${ticketID} deleted successfully with status code as ${response.status}`);
    data = await response.json();
    console.log(data);
}

deleteTicket(2);