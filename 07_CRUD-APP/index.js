const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => console.log("mongo connection open"))
  .catch((err) => console.log(err));

app.set("views,", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
