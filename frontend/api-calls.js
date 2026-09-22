async function getAllTickets() {
  try {
    const response = await fetch(
      "http://localhost:3000/tickets"
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log("All tickets:", data);
  } catch (error) {
    console.error(
      "Get tickets error:",
      error.message
    );
  }
}

// getAllTickets();


async function getTicketByID(ticketID) {
  try {
    const response = await fetch(
      `http://localhost:3000/tickets/${ticketID}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log("Ticket:", data);
  } catch (error) {
    console.error(
      "Get ticket error:",
      error.message
    );
  }
}

// getTicketByID(2);


async function createTicket(token) {
  const ticket = {
    title: "Password Problem",
    description: "I forgot my password",
    customerName: "Ali",
    priority: "HIGH",
    status: "OPEN",
  };

  try {
    const response = await fetch(
      "http://localhost:3000/tickets/createTicket",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ticket),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log("Created ticket:", data);
  } catch (error) {
    console.error(
      "Create ticket error:",
      error.message
    );
  }
}

// Do not call createTicket() directly.
// It needs the JWT returned by loginUser().


async function deleteTicket(ticketID) {
  try {
    const response = await fetch(
      `http://localhost:3000/tickets/deleteTicket/${ticketID}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log(
      "Deleted ticket:",
      data,
      "\nServer status:",
      response.status
    );
  } catch (error) {
    console.error(
      "Delete ticket error:",
      error.message
    );
  }
}

// deleteTicket(3);


async function editTicket() {
  const ticket = {
    id: 27,
    description: "I cannot scroll on my page",
  };

  try {
    const response = await fetch(
      `http://localhost:3000/tickets/editTicket/${ticket.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Failed to update ticket with status ${response.status}`
      );
    }

    console.log("Ticket after editing:", data);
  } catch (error) {
    console.error(
      "Edit ticket error:",
      error.message
    );
  }

  console.log(
    "The app did not crash. Moving to the next task."
  );
}

// editTicket();


async function registerUser() {
  const userData = {
    name: "Ali",
    email: "ali@example.com",
    password: "12345678",
  };

  try {
    const response = await fetch(
      "http://localhost:3000/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Registration failed with status ${response.status}`
      );
    }

    console.log("Registration response:", data);
  } catch (error) {
    console.error(
      "Registration error:",
      error.message
    );
  }
}

// registerUser();


async function loginUser() {
  const loginData = {
    email: "ali@example.com",
    password: "12345678",
  };

  try {
    const response = await fetch(
      "http://localhost:3000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log("Login successful:", data.user);

    // Test that the token can identify the current user.
    await getCurrentUser(data.token);

    // Create a ticket owned by the authenticated user.
    await createTicket(data.token);
  } catch (error) {
    console.error(
      "Login error:",
      error.message
    );
  }
}


async function getCurrentUser(token) {
  try {
    const response = await fetch(
      "http://localhost:3000/auth/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log(
      "Current authenticated user:",
      data
    );
  } catch (error) {
    console.error(
      "Authentication check failed:",
      error.message
    );
  }
}


// Start the authenticated test flow.
loginUser();