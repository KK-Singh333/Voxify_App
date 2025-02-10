const { log } = require('node:console');
const { validateToken } = require('../Services/jwtAuth');
const cookie = require("cookie");
function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) { 
            res.status(401);
            return res.json({
                errorflag: 'yes',
                redirecturl:'/login'
            });
        }
        try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
        }
        catch (error) {return res.json({
          errorflag: "yes",
          redirecturl: "/login",
        });}

    return next();
     }
}
function authenticateAsAuthor(req, res, next) {
    const cookie = req.cookies['token'];
    console.log(cookie);
    
    if (!cookie) {
        
        return res.json({
             errorflag: "yes",
             redirecturl: "/login",
           });;
        }
        try {
            const userPayload = validateToken(cookie);
            
            if (!userPayload.Role === "AUTHOR") {
               return res.json({
                 errorflag: "yes",
                 redirecturl: "/login",
               });
             }
            req.user = userPayload;
        }
        catch (error) {return res.json({
          errorflag: "yes",
          redirecturl: "/login",
        });}

    return next();
}
module.exports = {checkForAuthenticationCookie,authenticateAsAuthor}
 