const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    name: { type: String, required: true },    
    price: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: Number, required: true },
    description: { type: String, maxlength: 100 },
    imageUrl: { type: String, required: true },
    isSoftDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Shoe = mongoose.model("Shoe", shoeSchema);

module.exports = Shoe;
