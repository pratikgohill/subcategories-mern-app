const express = require("express");
const Category = require("../models/Category");
const Product = require("../models/Product");

const router = express.Router();

router.get("/categories", async (req, res) => {
  const categories = await Category.find().populate("subcategories").exec();
  res.json(categories);
});

router.post("/categories", async (req, res) => {
  const { name, parentId } = req.body;
  const category = new Category({ name, parentId });
  await category.save();
  res.json(category);
});

router.put("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name, parentId } = req.body;
  const category = await Category.findByIdAndUpdate(
    id,
    { name, parentId },
    { new: true }
  );
  res.json(category);
});

router.delete("/categories/:id", async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.json({ id });
});

router.get("/products", async (req, res) => {
  const products = await Product.find().populate("categories").exec();
  res.json(products);
});

router.post("/products", async (req, res) => {
  const { name, price, categoryIds } = req.body;
  const product = new Product({ name, price, categories: categoryIds });
  await product.save();
  res.json(product);
});

router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, categoryIds } = req.body;
  const product = await Product.findByIdAndUpdate(
    id,
    { name, price, categories: categoryIds },
    { new: true }
  );
  res.json(product);
});

router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ id });
});

module.exports = router;
