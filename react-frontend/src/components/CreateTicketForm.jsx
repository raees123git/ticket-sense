import { useState } from "react"

function CreateTicketForm({ onCreateTicket }){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event){
        event.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        if (!title.trim() || !description || !customerName) {
            setErrorMessage("All fields are required.");
            console.error("All fields are required");
            return;
        }

        const newTicket = {
            title: title.trim(),
            description: description.trim(),
            customerName: customerName.trim(),
        }

        try{
            const response = await fetch("http://localhost:3000/tickets/createTicket",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTicket)
            });

            if(!response.ok) throw new Error("Connection got interruped, seems no connection between frontend and backend");

            const data = await response.json();
            console.log("created ticket is ", data);

            onCreateTicket(data);
            setSuccessMessage("Your ticket was created successfully!");

            setTitle("");
            setDescription("");
            setCustomerName("");
        }catch (error){
            console.error("following error have occured: ",error.message)
        }

    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Create Ticket</h2>
            <label htmlFor="title">Title</label>
            <input type="text"
                   id="title"
                   placeholder="Enter Title" 
                   value={title}
                   onChange={(event)=>setTitle(event.target.value)}
            ></input>

            <label htmlFor="description">Deccription</label>
            <input type="text"
                   id="description"
                   placeholder="Enter Description"
                   value={description}
                   onChange={(event)=>setDescription(event.target.value)}
            />

            <label htmlFor="name">Customer Name</label>
            <input type="text" 
                    id="name" 
                    placeholder="Enter Customer Name"
                    value={customerName}
                    onChange={(event)=>setCustomerName(event.target.value)}
            />

            <button type="submit" className="add-ticket-button">Add Ticket</button>
            {successMessage && (<p className="success-message">{successMessage}</p>)}
            {errorMessage && (<p className="error-message">{errorMessage}</p>)}

        </form>
    )

}

export default CreateTicketForm