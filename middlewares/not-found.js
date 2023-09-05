function notFoundHandler(req, res) {
    res.status(404).render("shared/404");
}

module.exports = notFoundHandler;