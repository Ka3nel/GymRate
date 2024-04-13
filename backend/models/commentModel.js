const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    review_id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    parentComment: {
      type: string,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
