const express = require("express");
const handleCreatedBlog=require('../controller/createdBlog')
const Router = express.Router();
Router.post('/',handleCreatedBlog)
module.exports = Router;