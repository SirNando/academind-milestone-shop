const express = require('express');
const cartController = require("../controllers/orders.controller");
const router = express.Router();

router.get("/", cartController.getOrders);

router.post("/", cartController.addOrder);

router.get("/success", cartController.getSuccess);

router.get("/failure", cartController.getFailure);

module.exports = router;