const { MongoTailableCursorError } = require("mongodb");
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
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    comment: {
      type: String,
      required: false,
    },
    image_url: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compile the schema into a model and export it
// highlight-next-line
module.exports = mongoose.model("Review", reviewsSchema);
