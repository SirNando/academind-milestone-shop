function handleErrors(error, req, res, next) {
    console.log(error);

    switch (error.code) {
        case 404:
            res.status(404).render("shared/404");
        default:
            res.status(500).render("shared/500");
    }
}

module.exports = handleErrors;