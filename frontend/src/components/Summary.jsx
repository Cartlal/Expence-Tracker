// Summary.jsx
// Job of this component: display the total amount spent, plus how many
// expenses have been recorded. All the numbers it needs are calculated in
// App.jsx and passed down as props — this component just displays them.

function Summary({ total, count }) {
  return (
    <div className="summary-card">
      <div>
        <p className="summary-label">Total Spent</p>
        <p className="summary-total">₹{total.toFixed(2)}</p>
      </div>
      <div className="summary-count">
        <p className="summary-count-number">{count}</p>
        <p className="summary-label">{count === 1 ? "expense" : "expenses"}</p>
      </div>
    </div>
  );
}

export default Summary;
