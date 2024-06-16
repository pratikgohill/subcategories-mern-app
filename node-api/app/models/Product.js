const { Schema, default: mongoose } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

module.exports = mongoose.model("Product", ProductSchema);
