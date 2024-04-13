const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    gym_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    size_rating: {
      type: Number,
      required: true,
    },
    crowdness_rating: {
      type: Number,
      required: true,
    },
    machine_modernity_rating: {
      type: Number,
      required: true,
    },
    machine_variety_rating: {
      type: Number,
      required: true,
    },
    cleanliness_rating: {
      type: Number,
      required: true,
    },
    vibe_rating: {
      type: Number,
      required: true,
    },
    overall_rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
