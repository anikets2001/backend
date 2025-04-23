const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/shopApp")
  .then(() => console.log("connection open"))
  .catch((err) => console.log(err));

// Define schema
const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

// Define a virtual property
personSchema.virtual("fullname").get(function () {
  return `${this.first} ${this.last}`;
});

// Define pre middleware for "save"
personSchema.pre("save", async function () {
  console.log("ABOUT TO SAVE!!!");
});

// Define post middleware for "save"
personSchema.post("save", async function () {
  console.log("JUST SAVED");
});

// Include virtuals when converting to JSON or Object
personSchema.set("toObject", { virtuals: true });
personSchema.set("toJSON", { virtuals: true });

// Create model
const Person = mongoose.model("Person", personSchema);

// Create and save a document
const run = async () => {
  const me = new Person({ first: "Aniket", last: "Singh" });
  
  console.log(me.fullname); // Print fullname (virtual property)

  await me.save(); // Save to database (will trigger pre and post middleware)
};

run();
