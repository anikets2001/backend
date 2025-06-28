/*--- middleware in express.js
 *  middlewares are the functions that execute on every 
 *  http request 
 *  we can use in built npm middlewares and can also 
 *  define our custom middlewares to handle the tasks on each http request
 *  we can modify the req object using middleware
 *  we have to use next() for moving control to next middleware or route
 * 
 *  syntax:
 *  app.use((req,res,next)=>{
 *      //login here
 *      next();
 *  })
---*/

const express = require("express");
const morgan = require("morgan");
const app = express();

// inbuilt middleware from npm (package)(to log the current http request information)
app.use(morgan("tiny"));

// our custom middleware
app.use((req, res, next) => {
  console.log("this is my first middleware");
  next();
  console.log("this is my first middleware after next()"); //this line will execute after executing all the next tasks as middleware handles asynchronous tasks first and then come here again to execute it
});

// custom middleware to hijack the response
app.use((req, res, next) => {
  console.log("this is my second middleware");
  next();
  console.log("this is my second middleware after next()");
});

app.use("/dogs", (req, res, next) => {
  console.log("i love dogs");
  next();
});

// custom middleware creating a property (requestTime) in request object
app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

// it is important to use next() in each middleware as it tells what to execute next (if any other middleware after this or any route)

app.get("/", (req, res) => {
  console.log("request time:", req.requestTime);
  res.send("home page");
});

app.get("/about", (req, res) => {
  res.send("about page");
});


// middleware for page not found(invalid url)
app.use((req, res) => {
  res.send("not found");
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
