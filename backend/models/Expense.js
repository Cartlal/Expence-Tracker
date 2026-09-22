// Expense.js
// Job of this file: define the "shape" of an Expense document stored in MongoDB.
// Mongoose calls this shape a "Schema". A Schema is turned into a "Model",
// which is the object we actually use to create/read/update/delete documents.

const mongoose = require("mongoose");

// Define the fields every expense document must/can have.
const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String, // e.g. "Groceries"
      required: [true, "Title is required"], // custom error message if missing
      trim: true, // removes accidental leading/trailing spaces
    },
    amount: {
      type: Number, // e.g. 450.5
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    category: {
      type: String, // e.g. "Food", "Travel", "Shopping"
      required: [true, "Category is required"],
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now, // if no date is given, use "right now"
    },
  },
  {
    // Automatically adds "createdAt" and "updatedAt" fields to every document.
    // Handy for sorting expenses by when they were entered.
    timestamps: true,
  }
);

// mongoose.model(name, schema) creates a Model.
// Mongoose automatically stores documents from this model in a collection
// called "expenses" (lowercased + pluralized version of "Expense").
module.exports = mongoose.model("Expense", expenseSchema);
