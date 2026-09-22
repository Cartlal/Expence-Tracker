// db.js
// Job of this file: connect our backend to the MongoDB database using Mongoose.
// We keep this logic in its own file so server.js stays short and easy to read.

const mongoose = require("mongoose"); // mongoose lets us talk to MongoDB using JS objects/schemas

// This function returns a Promise, so we mark it "async" and use "await" inside it.
async function connectDB() {
  try {
    // mongoose.connect() opens a connection to the database whose address
    // is stored in the MONGO_URI environment variable (see backend/.env).
    await mongoose.connect(process.env.MONGO_URI);

    // If we reach this line, the connection succeeded.
    console.log("MongoDB connected successfully");
  } catch (error) {
    // If the connection fails (e.g. MongoDB is not running), log the error
    // and stop the whole app — there is no point running an API with no database.
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // exit code 1 = "something went wrong"
  }
}

// Export the function so server.js can call it.
module.exports = connectDB;
