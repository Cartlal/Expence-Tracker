// server.js
// Entry point of the backend. Running "node server.js" (or "npm run dev")
// starts this file. Its job: set up Express, connect to MongoDB, register
// our routes, and start listening for requests.

require("dotenv").config(); // loads variables from backend/.env into process.env

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express(); // create the Express application

// ---- Middleware -------------------------------------------------------
// Middleware = functions that run on every request before it reaches our routes.

app.use(cors()); // allows the React frontend (different port) to call this API
app.use(express.json()); // lets us read JSON sent in a request body as req.body

// ---- Database -----------------------------------------------------------
connectDB(); // connect to MongoDB (see config/db.js)

// ---- Routes ---------------------------------------------------------------
// Any request starting with /api/expenses is handled by expenseRoutes.js
app.use("/api/expenses", expenseRoutes);

// A simple root route, just to check the server is alive from a browser.
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running");
});

// ---- Start the server ------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
