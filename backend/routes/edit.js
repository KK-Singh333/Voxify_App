const express = require('express');
const handleEdit = require('../controller/editblog');
const Router = express.Router();
Router.post('/', handleEdit);
module.exports = Router;