const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

let publicRoot = __dirname + "/../frontend/build";

app.use(express.static(publicRoot));

app.get("/", (req, res, next) => {
    res.sendFile("index.html", { root: publicRoot });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});