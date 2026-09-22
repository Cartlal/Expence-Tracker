// ExpenseItem.jsx
// Job of this component: render ONE expense as a row/card, and provide the
// delete button for it. It receives the expense data + an "onDelete"
// function as props — it doesn't know HOW deleting works, just that it
// should call onDelete(expense._id) when the button is clicked.

import { getCategoryInfo } from "../categories";

function ExpenseItem({ expense, onDelete }) {
  const { icon, color } = getCategoryInfo(expense.category);

  // Format the date nicely, e.g. "22 Sep 2026".
  const formattedDate = new Date(expense.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <li className="expense-item">
      <span className="expense-icon" style={{ backgroundColor: `${color}22`, color }}>
        {icon}
      </span>

      <div className="expense-details">
        <p className="expense-title">{expense.title}</p>
        <p className="expense-meta">
          <span className="expense-category" style={{ color }}>
            {expense.category}
          </span>{" "}
          &middot; {formattedDate}
        </p>
      </div>

      <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>

      <button
        className="btn-delete"
        onClick={() => onDelete(expense._id)}
        title="Delete expense"
        aria-label="Delete expense"
      >
        ✕
      </button>
    </li>
  );
}

export default ExpenseItem;
