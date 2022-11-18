const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

const routes = (app) => {
    router.get('/userDetails/:email/:session', userController.getUserDetails);
    app.use("/api",router);
}

module.exports = routes;