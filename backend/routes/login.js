const express = require("express");
const handleLogin = require("../controller/Login");
const Router = express.Router();
Router.post("/", handleLogin);
module.exports = Router;
