// ExpenseForm.jsx
// Job of this component: show the "Add Expense" form and collect input from
// the user. It does NOT talk to the backend itself — instead it calls the
// "onAdd" function it receives as a prop, and lets App.jsx handle saving.
// This keeps the form dumb/reusable and the data logic in one place (App.jsx).

import { useState } from "react";
import { CATEGORIES } from "../categories";

function ExpenseForm({ onAdd }) {
  // One piece of state per input field. Each starts empty/default.
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].name);

  // Runs when the user submits the form (clicks "Add Expense" or presses Enter).
  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from doing a full page reload

    // Basic validation: don't submit empty/invalid data.
    if (!title.trim() || !amount || Number(amount) <= 0) {
      alert("Please enter a valid title and amount.");
      return;
    }

    // Hand the collected data up to App.jsx via the onAdd prop.
    onAdd({
      title: title.trim(),
      amount: Number(amount), // convert the text input into a number
      category,
    });

    // Reset the form back to empty for the next entry.
    setTitle("");
    setAmount("");
    setCategory(CATEGORIES[0].name);
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="What did you spend on?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-input form-input-amount"
          min="0"
          step="0.01"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-input form-select"
        >
          {CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.icon} {c.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn-add">
          + Add
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
