const express = require('express');
const Router = express.Router();
Router.get('/', (req, res) => {
    res.json({
        errorflag: 'no',
        redirecturl:'/writeblog',
    });
});
module.exports = Router;