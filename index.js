const express = require("express");
const bodyParser = require("body-parser"); //take-in incoming post requests
const usersRoutes = require("./routes/users");

var app = express(); //call express as a function
const PORT = 8000;

app.use(bodyParser.json());

app.use("/users", usersRoutes);

//Creating a route
app.get("/", (req, res) => {
  res.send("Hello from the backend team!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); //Listen for incoming requests
