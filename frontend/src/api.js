// api.js
// Job of this file: hold every function that talks to our backend API.
// Keeping fetch() calls here (instead of scattered in components) means
// components only need to call something like getExpenses() or addExpense(data).

const BASE_URL = "/api/expenses";
// Note: "/api/expenses" is forwarded to http://localhost:5000/api/expenses
// by the proxy set up in vite.config.js — see that file for details.

// ---------------------------------------------------------------------------
// Fetch every expense from the backend.
// ---------------------------------------------------------------------------
export async function getExpenses() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to load expenses");
  }

  return response.json(); // parses the JSON response body into a JS array
}

// ---------------------------------------------------------------------------
// Send a new expense to the backend to be saved in MongoDB.
// "expenseData" looks like { title, amount, category }.
// ---------------------------------------------------------------------------
export async function addExpense(expenseData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // tells the server the body is JSON
    },
    body: JSON.stringify(expenseData), // convert the JS object into a JSON string
  });

  if (!response.ok) {
    throw new Error("Failed to add expense");
  }

  return response.json(); // the newly created expense, including its _id
}

// ---------------------------------------------------------------------------
// Delete one expense by its MongoDB _id.
// ---------------------------------------------------------------------------
export async function deleteExpense(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }

  return response.json();
}
