// requiring mongoose
const mongoose = require("mongoose");

// connecting mongodb with mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/shopApp")
  .then(() => {
    console.log("connection open");
  })
  .catch((err) => {
    console.log(err);
  });

// schema for product
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // required true validator
    maxLength: 20, //max length validator
  },
  price: {
    type: Number,
    required: true, // required true validator
    min: [0, "Price must be positive"], //custom error message
  },
  onSale: {
    type: Boolean,
    default: false, //default validator
  },
  categories: [String],
  size: {
    type: String,
    enum: ["S", "M", "L"], //enum(can only from these options - not other than these options)
  },
});

// creating our own instance method for product schema
productSchema.methods.greet = function () {
  console.log("hello, how are you");
};

// creating our own static method for product schema
productSchema.statics.findByCategory = function (category) {
  return this.find({ categories: category });
};

// model for product
const Product = mongoose.model("Product", productSchema);

// creating a new product
const bike = new Product({
  name: "Tire Pump",
  price: 20,
  categories: ["cycling"],
});

// calling greet instance method on laptop product
const laptop = new Product({ name: "Laptop", price: 5500 });
console.log(laptop.greet()); // hello how are you


// calling our static method on product model
Product.findByCategory("cycling")
  .then((products) => {
    console.log("Products in category:", products);
  })
  .catch((err) => {
    console.log("Error:", err);
  });

// creating and saving product in db
bike
  .save()
  .then((data) => {
    console.log("it worked");
    console.log(data);
  })
  .catch((err) => {
    console.log("oh no error");
    console.log(err);
  });

// updating a product
// Product.findOneAndUpdate(
//   { name: "Tire Pump" },
//   { price: -110 },
//   { new: true, runValidators: true }
// )
//   .then((data) => {
//     console.log("it worked");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("oh no error");
//     console.log(err);
//   });

// Usage
const p = new Product({ name: "Laptop", price: 5500 });

console.log(p.greet()); // Output: Hello, my name is John

/* --- difference between instance methods and static methods
instance methods are invoked on a particular instance like a product  - this refers to individual document
static methods are invoked on the Model itself(like Product Model)    - this refers to the model itself
---*/
