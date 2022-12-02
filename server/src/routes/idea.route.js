const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/idea.controller");

const routes = (app) => {
  router.post("/createNewPitch", ideaController.createNewPitch);
  router.get("/getAllPitch/:userId", ideaController.getAllPitch);
  router.get("/getPitchByUser/:userId", ideaController.getPitchByUser);
  router.put("/updatePitch", ideaController.editPitch);
  app.use("/api", router);
};

module.exports = routes;
