const Cart = require("../models/cart.model");

function initializeCart(req, res, next) {
    let cart;

    if(!req.session.cart) {
        cart = new Cart();
    } else {
        const sessionCart = req.session.cart;
        cart = new Cart(req.session.cart.items, sessionCart.totalQuantity, sessionCart.totalPrice);
    }

    res.locals.cart = cart;

    next();
}

module.exports = initializeCart;