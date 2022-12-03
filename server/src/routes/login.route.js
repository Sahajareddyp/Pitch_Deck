const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");

const routes = (app) => {
    router.post('/login',loginController.loginUser);
    router.get('/logout',loginController.logoutUser);
    router.post('/forgotPassword', loginController.forgotPassword);
    router.post('/resetPassword', loginController.resetPassword);
    app.use("/api",router);
}

module.exports = routes;