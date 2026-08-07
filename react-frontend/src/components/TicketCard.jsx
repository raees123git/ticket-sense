function TicketCard(props) {
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
        <button type="button" className="edit-button">
          Edit
        </button>

        <button type="button" className="delete-button">
          Delete
        </button>
      </div>
    </article>
  )
}

export default TicketCard