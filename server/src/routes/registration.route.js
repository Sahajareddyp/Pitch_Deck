const express = require("express");
const router = express.Router();
const registrationController = require('../controllers/registration.controller');

let routes = (app) => {
    router.post("/registerUser", registrationController.registerNewUser);
    app.use("/api",router);
}

module.exports = routes;