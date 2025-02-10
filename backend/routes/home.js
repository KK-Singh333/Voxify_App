const express = require('express');
const handleSearch = require('../controller/Search.js');
const Router = express.Router();
Router.post("/",handleSearch)
module.exports = Router;