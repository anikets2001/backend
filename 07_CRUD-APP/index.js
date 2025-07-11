const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");
const methodOverride = require("method-override");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => console.log("mongo connection open"))
  .catch((err) => console.log(err));

app.set("views,", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"];

// list of all products
app.get("/products", async (req, res) => {
  //READ
  const { category } = req.query;

  //   if query string has a category then show only that category (filter)
  if (category) {
    const products = await Product.find({ category });
    res.render("products/index", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index", { products, category: "All" });
  }
});

// form to create a new product
app.get("/products/new", (req, res) => {
  //CREATE
  res.render("products/new", { categories });
});

// creating new product in db
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

// details page for a particular product                (READ BY ID)
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});

// updating particular product                          (UPDATE)
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.redirect(`/products/${product._id}`);
});

// delete particular product                           (DELETE)
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

// listening to server on port 5000
app.listen(5000, () => {
  console.log("listening on port 5000");
});
