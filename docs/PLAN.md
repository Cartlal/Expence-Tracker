# Expense Tracker — Project Plan

A simple, beginner-friendly Expense Tracker web app built with **React** (frontend),
**Node.js + Express** (backend), and **MongoDB** (database). The goal is teaching:
every file will have **line-by-line comments** explaining what the code does and why,
so this can be walked through with students.

---

## 1. Tech Stack (kept intentionally simple)

| Layer      | Technology                          | Why |
|------------|--------------------------------------|-----|
| Frontend   | React (Create React App or Vite) + plain CSS | Component-based UI, easy for students to follow |
| Backend    | Node.js + Express.js                | Minimal REST API framework, very common in tutorials |
| Database   | MongoDB (local or MongoDB Atlas free tier) | NoSQL, easy JSON-like documents match JS objects |
| ODM        | Mongoose                             | Simplifies MongoDB queries with schemas/models |
| HTTP calls | fetch API or axios                   | Frontend talks to backend REST API |

No TypeScript, no Redux, no extra state-management libraries — plain React `useState`/`useEffect`
so the code stays short and easy to explain.

---

## 2. Folder Structure

```
Expense Tracker/
├── docs/
│   └── PLAN.md                 <- this file
├── backend/
│   ├── server.js               <- entry point, starts Express server
│   ├── config/
│   │   └── db.js               <- MongoDB connection logic
│   ├── models/
│   │   └── Expense.js          <- Mongoose schema/model for an expense
│   ├── routes/
│   │   └── expenseRoutes.js    <- API endpoints (GET/POST/DELETE)
│   ├── .env                    <- MongoDB connection string (not committed)
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── ExpenseForm.jsx     <- form to add a new expense
    │   │   ├── ExpenseList.jsx     <- table/list showing all expenses
    │   │   ├── ExpenseItem.jsx     <- single row/card + delete button
    │   │   └── Summary.jsx         <- total amount spent
    │   ├── App.jsx                 <- main component, holds state, fetches data
    │   ├── api.js                  <- small helper functions for calling backend
    │   ├── index.js                <- React root render
    │   └── index.css               <- simple global styling
    └── package.json
```

---

## 3. Data Model

**Expense** (one MongoDB document per expense):

| Field       | Type     | Notes                          |
|-------------|----------|----------------------------------|
| `title`     | String   | e.g. "Groceries"                |
| `amount`    | Number   | e.g. 450.50                     |
| `category`  | String   | e.g. "Food", "Travel", "Other"  |
| `date`      | Date     | defaults to now                 |
| `createdAt` | Date     | auto (Mongoose timestamps)      |

---

## 4. REST API Endpoints (backend)

| Method | Route              | Purpose                     |
|--------|--------------------|------------------------------|
| GET    | `/api/expenses`     | Fetch all expenses           |
| POST   | `/api/expenses`     | Add a new expense            |
| DELETE | `/api/expenses/:id` | Delete an expense by its id  |

(Kept to 3 endpoints — enough for a full CRUD teaching example without over-complicating it.
Edit/update can be a "bonus exercise" for students later.)

---

## 5. Frontend Features (simple UI)

1. A form at the top: **title, amount, category** inputs + "Add Expense" button.
2. A list below showing all expenses (title, amount, category, date) with a **Delete** button on each.
3. A running **total** displayed at the top or bottom ("Total Spent: ₹1200").
4. Minimal, clean CSS — no UI framework, so students can see plain CSS classes.

---

## 6. Commenting Standard (for teaching)

Every source file will include:
- A short top-of-file comment explaining the file's role.
- A comment above each function explaining what it does.
- Inline comments on non-obvious lines (e.g. `useEffect`, Mongoose queries, Express middleware)
  explaining **why**, not just restating the code.

---

## 7. Build Steps (order of implementation)

1. Scaffold folders (`backend/`, `frontend/`) and this `docs/` plan. ✅ (this step)
2. **Backend**
   - `backend/package.json` + install `express`, `mongoose`, `cors`, `dotenv`.
   - `config/db.js` — connect to MongoDB using Mongoose.
   - `models/Expense.js` — Mongoose schema.
   - `routes/expenseRoutes.js` — GET/POST/DELETE handlers.
   - `server.js` — wires up Express app, middleware, routes, starts server.
   - `.env` — `MONGO_URI` and `PORT`.
3. **Frontend**
   - Scaffold React app (Vite) in `frontend/`.
   - `api.js` — fetch helper functions calling the backend.
   - `components/ExpenseForm.jsx`, `ExpenseItem.jsx`, `ExpenseList.jsx`, `Summary.jsx`.
   - `App.jsx` — ties everything together with `useState`/`useEffect`.
   - Basic `index.css` styling.
4. **Run & connect**
   - Start MongoDB (local `mongod` or Atlas connection string).
   - Start backend (`node server.js`, port 5000).
   - Start frontend (`npm run dev`, port 5173) with proxy/CORS to backend.
   - Verify add/list/delete works end-to-end in the browser.
5. Add a top-level `README.md` with setup + run instructions for students.

---

## 8. Prerequisites to Run

- Node.js installed.
- MongoDB running locally (`mongodb://localhost:27017`) **or** a free MongoDB Atlas
  cluster connection string.

---

## 9. Possible "bonus" exercises for students (not built initially)

- Edit an existing expense (PUT endpoint).
- Filter expenses by category or date range.
- Charts (e.g. pie chart of spending by category).
- User login (auth) so each user has their own expenses.

---

*Next step: implement backend first, then frontend, following the order in Section 7.*
