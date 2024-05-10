// Import necessary packages
const mongoose = require("mongoose");

// Define the shop owner schema
const shopOwnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop", // Reference to the Shop model
    },
  },
  { timestamps: true }
);

// Create and export the shop owner model
module.exports = mongoose.model("Owner", shopOwnerSchema);
