const express = require('express');
console.log("You came on this route");

const handleSignUp=require("../controller/SignUp")
const Router = express.Router();
Router.post('/' ,handleSignUp);
module.exports = Router;