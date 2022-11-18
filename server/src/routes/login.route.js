const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");

const routes = (app) => {
    router.post('/login',loginController.loginUser);
    router.get('/logout',loginController.logoutUser);
    app.use("/api",router);
}

module.exports = routes;