const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    openingHours: {
      type: String,
    },
    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
    },
    email: {
      type: String,
    },
    shopPhoneNumber: {
      type: String,
    },
    floorLevel: {
      type: String,
      enum: ["Basement", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"],
    },
    shopNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 40,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner", // Reference to the Owner model
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", shopSchema);
