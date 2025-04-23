// imports (modules and files)
const express = require("express");
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
const comments = require("./data");

// executing express
const app = express();

// for overriding http method
app.use(methodOverride("_method"));

// executing uuid
uuid();

// body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for referring ejs from any location
app.set("views", path.join(__dirname, "views"));

// setting view engine ejs
app.set("view engine", "ejs");

// get route for comments(show all comments)
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

// create a new comment
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ id: uuid(), username, comment });
  console.log("comments", comments);
  res.redirect("/comments");
});

// show one comment
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  if (!comment) {
    return res.send("Comment not found!");
  }
  res.render("comments/show", { comment });
});

// update comment
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

// delete a comment
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.redirect("/comments");
});

// starting server at post:5000
app.listen(5000, () => {
  console.log("listening on port 5000...");
});
