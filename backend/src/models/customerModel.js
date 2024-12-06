// Import the mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define a schema for the Customer model
const customerSchema = new mongoose.Schema({
  // Define the 'fullname' field, which is a required string
  fullname: { type: String, required: true },

  swilId: { type: String, required: false, unique: true },

  // Define the 'email' field, which is a required string
  email: { type: String, required: true },

  // Define the 'phoneNumber' field, which is a required string
  phoneNumber: { type: String, required: true },

  // Define the 'alias' field, which is a required string
  alias: { type: String, required: true, unique: true },

  // Define the 'abhanumber' field, which is an optional number
  abhanumber: { type: Number, required: false },

  // Define the 'pincode' field, which is a required number
  pincode: { type: Number, required: true },

  // Define the 'station' field, which is a required string
  station: { type: String, required: true },

  // Define the 'age' field, which is a required number
  age: { type: Number, required: true },

  // Define the 'sex' field, which is a required string with specific allowed values
  sex: { type: String, enum: ["Male", "Female", "Other"], required: true },

  // Define the 'address' field, which is a required string
  address: { type: String, required: true },
});

// Create a Mongoose model called 'Customer' based on the customerSchema
const Customer = mongoose.model("Customer", customerSchema);

// Export the Customer model to make it accessible in other modules
module.exports = Customer;
