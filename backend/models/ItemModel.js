const mongoose = require("mongoose")
const Schema = mongoose.Schema

const itemSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Item", itemSchema)
