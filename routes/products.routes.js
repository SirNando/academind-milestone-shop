const express = require('express');
const router = express.Router();

router.get("/products", (req, res) => {
    res.render("customer/products/all-products");
})

module.exports = router;