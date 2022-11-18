const express = require("express");
let bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

//routes
const registrationRoutes = require('./src/routes/registration.route');
const loginRoutes = require('./src/routes/login.route');
const userRoutes = require('./src/routes/user.route');

const app = express();
console.log(__dirname);
let publicRoot = __dirname + "/../frontend/build";

app.use(express.static(publicRoot));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

app.get("/", (req, res, next) => {
    res.sendFile("index.html", { root: publicRoot });
  });

registrationRoutes(app);
loginRoutes(app);
userRoutes(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});