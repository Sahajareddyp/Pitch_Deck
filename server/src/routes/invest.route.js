const express = require("express");
const router = express.Router();
const investController = require("../controllers/invest.controller");

const routes = (app) => {
  router.post("/createInvestment", investController.createInvestment);
  router.get("/getInvestmentDetails/:ideaId/:userId", investController.getInvestementDetails);
  app.use("/api", router);
};

module.exports = routes;
