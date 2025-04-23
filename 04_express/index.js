const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const num = Math.floor(Math.random() * 10);
  res.render("home", { rand: num });
});

app.get("/friends", (req, res) => {
  const friends = ["Dushayant", "Anik", "Deepanshu", "Aryan"];
  res.render("friends", { friends });
});

app.listen(5000, () => {
  console.log("server running at port 5000;");
});
