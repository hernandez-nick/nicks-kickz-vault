const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    colorway: { type: String, required: true },
    size: { type: Number, required: true },
    retailPrice: { type: Number, required: true },
    isDeadstock: { type: Boolean, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Shoe = mongoose.model("Shoe", shoeSchema);

module.exports = Shoe;
