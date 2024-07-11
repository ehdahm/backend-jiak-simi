const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      Ref: "Users",
      required: true,
    },
    dish_id: {
      type: Schema.Types.ObjectId,
      ref: "Dishes",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compile the schema into a model and export it
// highlight-next-line
module.exports = mongoose.model("Review", reviewsSchema);
