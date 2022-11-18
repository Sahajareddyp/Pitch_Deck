const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/idea.controller');

const routes = (app) => {
    router.post('/createNewPitch', ideaController.createNewPitch);
    router.get('/getAllPitch', ideaController.getAllPitch);
    app.use('/api',router);
}

module.exports = routes;