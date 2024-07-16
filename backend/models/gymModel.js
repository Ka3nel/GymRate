const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gymSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    size: {
      type: Number,
      required: false,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    opening_time: {
      type: String,
      required: false,
    },
    closing_time: {
      type: String,
      required: false,
    },
    total_rating: {
      type: Number,
      required: true,
    },
    review_count: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gym", gymSchema);
