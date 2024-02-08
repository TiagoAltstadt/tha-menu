const { default: mongoose } = require("mongoose");
const Recipe = require("../models/RecipeModel");
const mangoose = require("mongoose");

const getRecipes = async (req, res) => {
  const recipes = await Recipe.find({}).sort({ createdAt: -1 });
  res.status(200).json(recipes);
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is messed up" });
  }
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return res.status(400).json({ error: "No such recipe" });
  }
  res.status(200).json(recipe);
};

const createRecipe = async (req, res) => {
  const { title, type, description, ingredients, rating } = req.body;
  let emptyFields = [];

  // Validate there are no empty fields
  if (!title) {
    emptyFields.push("title");
  }
  if (!type) {
    emptyFields.push("type");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!ingredients) {
    emptyFields.push("ingredients");
  }
  if (!rating) {
    emptyFields.push("rating");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields: ", emptyFields });
  }

  try {
    const recipe = await Recipe.create({
      title,
      type,
      description,
      ingredients,
      rating,
    });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is messed up" });
  }
  const recipe = await Recipe.findOneAndDelete({ _id: id });
  if (!recipe) {
    return res.status(400).json({ error: "No such recipe" });
  }

  res.status(200).json({ recipe });
};
const updateRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is messed up" });
  }
  const recipe = await Recipe.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!recipe) {
    return res.status(400).json({ recipe });
  }

  res.status(200).json({ recipe });
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
};
