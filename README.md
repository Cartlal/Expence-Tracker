# Expense Tracker

A simple full-stack Expense Tracker built with **React** (frontend), **Node.js + Express**
(backend), and **MongoDB** (database). See [docs/PLAN.md](docs/PLAN.md) for the full design
plan — every source file is commented line-by-line for teaching purposes.

## Project Structure

```
Expense Tracker/
├── docs/PLAN.md      <- design/plan document
├── backend/          <- Express REST API + Mongoose
└── frontend/         <- React (Vite) UI
```

## 1. Set up MongoDB Atlas (or local MongoDB)

1. Create a free cluster at https://www.mongodb.com/cloud/atlas.
2. Create a database user (username + password) under **Database Access**.
3. Under **Network Access**, add your current IP (or `0.0.0.0/0` for easy local testing).
4. Click **Connect → Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
   ```
5. Open `backend/.env` and set `MONGO_URI` to that string, adding a database name
   before the `?`, e.g.:
   ```
   MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority
   ```

(If you'd rather run MongoDB locally instead of Atlas, install MongoDB Community Server
and keep the default `MONGO_URI=mongodb://127.0.0.1:27017/expense-tracker` already in `.env`.)

## 2. Run the backend

```bash
cd backend
npm install
npm run dev
```

You should see `MongoDB connected successfully` and `Server running on http://localhost:5000`.

## 3. Run the frontend

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173). The frontend automatically forwards
`/api/...` requests to the backend on port 5000 (see `frontend/vite.config.js`).

## 4. Use the app

- Fill in the title, amount, and category, then click **+ Add**.
- Your expenses appear in the list below, with the total updating at the top.
- Click the **✕** button on any expense to delete it.

## How data flows (for teaching)

```
React UI (ExpenseForm/ExpenseList)
   → src/api.js (fetch calls)
      → Express routes (backend/routes/expenseRoutes.js)
         → Mongoose model (backend/models/Expense.js)
            → MongoDB (Atlas or local)
```

Every file involved has comments explaining what each line/block does — start at
`backend/server.js` and `frontend/src/App.jsx` and follow the imports.
# Expence-Tracker
