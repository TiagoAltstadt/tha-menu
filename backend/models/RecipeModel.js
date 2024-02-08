const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: Number, required: true },
    description: { type: String, required: true },
    ingredients: { type: [String], required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
