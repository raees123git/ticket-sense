import { useState } from "react";

function TicketCard(props) {

    const ticket = {
    id:props.id,
    title:props.title,
    description:props.description,
    status:props.status,
    customerName:props.customerName,
    priority:props.priority,
  }
  
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: ticket.title,
    description: ticket.description,
    customerName: ticket.customerName,
    status: ticket.status,
    priority: ticket.priority,
  });

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const editSucceeded = await props.onEditTicket(
      ticket.id,
      formData
    );

    if (editSucceeded) {
      setIsEditing(false);
    }
  }


  function handleCancel() {
    setFormData({
      title: ticket.title,
      description: ticket.description,
      customerName: ticket.customerName,
      status: ticket.status,
      priority: ticket.priority,
    });

    setIsEditing(false);
  }

  if(isEditing){
    return (
      <article className="ticket-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor={`title-${ticket.id}`}>
            Title
          </label>

          <input
            id={`title-${ticket.id}`}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />

          <label htmlFor={`description-${ticket.id}`}>
            Description
          </label>

          <textarea
            id={`description-${ticket.id}`}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <label htmlFor={`customerName-${ticket.id}`}>
            Customer name
          </label>

          <input
            id={`customerName-${ticket.id}`}
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
          />

          <label htmlFor={`status-${ticket.id}`}>
            Status
          </label>

          <select
            id={`status-${ticket.id}`}
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">
              In progress
            </option>
            <option value="CLOSED">Closed</option>
          </select>

          <label htmlFor={`priority-${ticket.id}`}>
            Priority
          </label>

          <select
            id={`priority-${ticket.id}`}
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <button type="submit">
            Save changes
          </button>

          <button
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </article>
    );
  }

  return (
    <article className="ticket-card">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <div className="ticket-details">
        <p>
          <strong>Customer:</strong> {props.customerName}
        </p>

        <p>
          <strong>Status:</strong> {props.status}
        </p>

        <p>
          <strong>Priority:</strong> {props.priority}
        </p>
      </div>

      <div className="ticket-actions">
        <button type="button" className="edit-button" onClick={ ()=> setIsEditing(true)}>
          {/* { ()=> setIsEditing(true)} means first we are creating wrapper function, and inside that wrapper function is our code, so for inner function( setIsEditing(true) ) to get executed, first we need to call our outer function, and outer function will be called when we will click that button because it is attach with the onClick handler.*/}
          Edit
        </button>

        <button type="button" className="delete-button" onClick={ ()=> props.onDeleteTicket(props.id) }>
          Delete
        </button>
      </div>
    </article>
  )
}

export default TicketCard