// App.jsx
// The main/root component. It is responsible for:
//   1. Holding the list of expenses in state.
//   2. Loading expenses from the backend when the page first opens.
//   3. Passing "add" and "delete" handlers down to child components.
// Child components (ExpenseForm, ExpenseList, Summary) just display data
// and call these handlers — they don't talk to the API directly.

import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import { getExpenses, addExpense, deleteExpense } from "./api";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]); // the list of expenses
  const [loading, setLoading] = useState(true); // true while first fetch is in progress
  const [error, setError] = useState(""); // holds an error message, if any

  // useEffect with an empty dependency array [] runs ONCE, right after the
  // component first renders — perfect for "load initial data from the API".
  useEffect(() => {
    loadExpenses();
  }, []);

  // Fetch all expenses from the backend and store them in state.
  async function loadExpenses() {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
      setError("");
    } catch (err) {
      setError("Could not load expenses. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  }

  // Called by ExpenseForm when the user submits a new expense.
  async function handleAdd(expenseData) {
    try {
      const newExpense = await addExpense(expenseData);
      // Add the new expense to the front of the current list, without
      // needing to re-fetch everything from the server.
      setExpenses((prev) => [newExpense, ...prev]);
    } catch (err) {
      setError("Could not add expense. Please try again.");
    }
  }

  // Called by ExpenseList/ExpenseItem when the user clicks the delete button.
  async function handleDelete(id) {
    try {
      await deleteExpense(id);
      // Remove the deleted expense from state by keeping everything except it.
      setExpenses((prev) => prev.filter((expense) => expense._id !== id));
    } catch (err) {
      setError("Could not delete expense. Please try again.");
    }
  }

  // Calculate the total spent by adding up every expense's amount.
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="page">
      <div className="container">
        <header className="app-header">
          <h1>💸 Expense Tracker</h1>
          <p className="app-subtitle">Keep an eye on where your money goes.</p>
        </header>

        <Summary total={total} count={expenses.length} />

        <ExpenseForm onAdd={handleAdd} />

        {error && <p className="error-banner">{error}</p>}

        {loading ? (
          <p className="loading-text">Loading expenses...</p>
        ) : (
          <ExpenseList expenses={expenses} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default App;
