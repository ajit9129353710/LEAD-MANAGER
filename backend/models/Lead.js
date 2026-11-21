const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [
        /^\+?[0-9\s()-]{7,20}$/,
        "Please enter a valid phone number",
      ],
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    source: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);