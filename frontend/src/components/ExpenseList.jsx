// ExpenseList.jsx
// Job of this component: render the full list of expenses by looping over
// the "expenses" array and rendering one <ExpenseItem> per entry. If there
// are no expenses yet, show a friendly empty-state message instead.

import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>No expenses yet</p>
        <p className="empty-state-sub">Add your first expense above to get started.</p>
      </div>
    );
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        // "key" helps React efficiently track which item is which when the
        // list changes (e.g. after a delete). MongoDB's _id is a perfect key
        // because it is unique for every document.
        <ExpenseItem key={expense._id} expense={expense} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default ExpenseList;
