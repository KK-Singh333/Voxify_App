const express = require('express');
const Router = express.Router();
Router.get('/', (req, res) => {
     return res.json(req.user);
});
module.exports = Router;