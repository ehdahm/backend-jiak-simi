const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const dishesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    place_id: {
      type: Schema.Types.ObjectId,
      ref: "Places",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compile the schema into a model and export it
// highlight-next-line
module.exports = mongoose.model("Dishes", dishesSchema);
