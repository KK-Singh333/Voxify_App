const express = require("express");
const Router = express.Router();
Router.get('/', (req, res) => {
    res.clearCookie('token');
    res.redirect("to login");
})
module.exports = Router;