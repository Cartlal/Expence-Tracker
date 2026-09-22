// expenseRoutes.js
// Job of this file: define the API endpoints ("routes") for expenses, and
// what each one does. This is where our backend talks to MongoDB through
// the Expense model.

const express = require("express");
const router = express.Router(); // a mini "sub-app" that server.js will mount at /api/expenses
const Expense = require("../models/Expense");

// ---------------------------------------------------------------------------
// GET /api/expenses
// Purpose: return every expense in the database, newest first.
// ---------------------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    // find({}) with no filter means "get everything".
    // sort({ date: -1 }) means "newest date first" (-1 = descending).
    const expenses = await Expense.find({}).sort({ date: -1 });

    res.status(200).json(expenses); // 200 = OK, send the array back as JSON
  } catch (error) {
    // If something goes wrong talking to the database, tell the client.
    res.status(500).json({ message: "Failed to fetch expenses", error: error.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/expenses
// Purpose: create a new expense from the data sent in the request body.
// ---------------------------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    // req.body holds the JSON the frontend sent, e.g.
    // { title: "Groceries", amount: 450, category: "Food" }
    const { title, amount, category, date } = req.body;

    // Expense.create() builds a new document AND saves it to MongoDB in one step.
    const newExpense = await Expense.create({ title, amount, category, date });

    res.status(201).json(newExpense); // 201 = Created, send back the saved document (now with an _id)
  } catch (error) {
    // Likely a validation error (e.g. missing title) — 400 = Bad Request.
    res.status(400).json({ message: "Failed to create expense", error: error.message });
  }
});

// ---------------------------------------------------------------------------
// DELETE /api/expenses/:id
// Purpose: delete one expense by its MongoDB _id.
// ---------------------------------------------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // the :id part of the URL, e.g. /api/expenses/64f1...

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      // No document had that id — nothing to delete.
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted", id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense", error: error.message });
  }
});

module.exports = router;
