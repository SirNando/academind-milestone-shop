const express = require('express');
const cartController = require("../controllers/orders.controller");
const router = express.Router();

router.get("/", cartController.getOrders);

router.post("/", cartController.addOrder);

module.exports = router;