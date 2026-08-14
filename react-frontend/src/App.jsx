import { useState, useEffect } from 'react'
import TicketCard from './components/TicketCard.jsx'
import CreateTicketForm from './components/CreateTicketForm.jsx'
import './App.css'

function App() {
    const [status, setStatus] = useState("ALL");
    const [tickets, setTickets] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
  useEffect(() => {
    async function fetchAllTickets(){
      try{
        setLoading(true);
        setError(null);
        const url = status === "ALL" ? "http://localhost:3000/tickets"  : `http://localhost:3000/tickets?status=${status}`;
        const response = await fetch(url);

        if (!response.ok){
          throw new Error(`Failed to fetch tickets: ${response.status}`);
        }

        const ticketsFromBackend = await response.json();
        setTickets(ticketsFromBackend);
      }
      catch(error){
        setError(error.message)
      }
      finally{
        setLoading(false);
      }
    }
    fetchAllTickets();
  },[status])


  function handleCreateTicket(createdTicket){
    if (status === "ALL" || createdTicket.status === status){
      setTickets([...tickets,createdTicket]);
    }
  }

  async function handleDeleteTicket(id){
      try{
        setLoading(true);
        const response = await fetch(`http://localhost:3000/tickets/deleteTicket/${id}`,{
          method:"DELETE"
        });
        if (!response.ok){
          throw new Error(`Failed to delete ticket: ${response.status}, kindly check your network connection.`);
        }

        const data = await response.json();
        console.log("deleted ticket is: ",data);

        setTickets((tickets) => tickets.filter((ticket) => ticket.id !== id))
        
      }catch (error){
        setError(error.message)
      }finally{
        setLoading(false);
      }
    }

  async function handleEditTicket(ticketId, editTicketData) {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(
      `http://localhost:3000/tickets/editTicket/${ticketId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editTicketData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Failed to update ticket: ${response.status}`
      );
    }

    setTickets((currentTickets) =>
      currentTickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return data;
        }

        return ticket;
      })
    );

    return true;

  } catch (error) {
    setError(error.message);
    return false;
  } finally {
    setLoading(false);
  }
}


  return  (
  <main className="app">
    <header className="app-header">
      <h1>TicketSense</h1>
      <p>Customer support ticket management system</p>
    </header>

    <CreateTicketForm onCreateTicket={handleCreateTicket} />

    <section className="tickets-section">
      <div className="tickets-toolbar">
        <h2>Support Tickets</h2>

        <div className="filter">
          <label htmlFor="status-filter">Filter by status</label>

          <select
            id="status-filter"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="ALL">All</option>
            <option value="OPEN">Open</option>
            <option value="CLOSE">Closed</option>
            <option value="IN_PROGRESS">In Progress</option>
          </select>
        </div>
      </div>

      {isLoading && <p>Loading tickets...</p>}

      {error && <p className="error-message">{error}</p>}

      {!isLoading && !error && tickets.length === 0 && (
        <p>No tickets found with status {status}.</p>
      )}

      {!isLoading && !error && tickets.length > 0 && (
        <div className="tickets-grid">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              description={ticket.description}
              customerName={ticket.customerName}
              status={ticket.status}
              priority={ticket.priority}
              onDeleteTicket={handleDeleteTicket}
              onEditTicket={handleEditTicket}
            />
          ))}
        </div>
      )}
    </section>
  </main>
);
}

export default App