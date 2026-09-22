require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");
const AppError = require("./errors/app-error");

const ticketRoutes = require("./routes/ticket.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tickets", ticketRoutes);
app.use("/auth", authRoutes);


app.use((request, response, next) => {
  next(
    new AppError(
      `Route ${request.method} ${request.originalUrl} not found... kdr ay hu bhai`,
      404
    )
  );
});


app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});