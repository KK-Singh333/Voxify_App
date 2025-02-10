const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const PORT = 8000;
const signUpRoute = require('./routes/signup.js');
const loginRoute = require("./routes/login.js");
const homeRoute = require("./routes/home.js");
const writeRoute = require('./routes/create_blog.js');
const signOutRoute = require('./routes/signout.js');
const userData = require('./routes/user_data.js');
const checkAuthor = require('./routes/check_author.js')
const EditBlog = require('./routes/edit.js');
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie, authenticateAsAuthor } = require("./middlewares/authentication.js");
mongoose.connect('mongodb://localhost:27017/Voxify_User_Data').then((e) => {console.log("MongoDB connected");
});
const userAuthenticator = checkForAuthenticationCookie('token');
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req, res) => { 
    express.static('path_to_homepage');
})
app.use('/signup',signUpRoute);
app.use("/login", loginRoute);
app.use('/home', userAuthenticator, homeRoute);
app.use(
  "/search",
  userAuthenticator,
  homeRoute
);
app.use(
  "/write_blog",
  userAuthenticator,
  authenticateAsAuthor,
  writeRoute
);
app.use("/userdata",userAuthenticator,userData);
app.use('/signout',userAuthenticator,signOutRoute);
app.use("/checkauthor", authenticateAsAuthor, checkAuthor);
app.use("/edit", authenticateAsAuthor,EditBlog);
app.listen(PORT, () => {console.log(`Listening At Port :${PORT}`);
})
