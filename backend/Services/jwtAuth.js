const JWT = require("jsonwebtoken");
const code = "ArigatoGonzaimas";
function createToken(user) {
    const payload = {
        _id:user._id,
        Name: user.Name,
        Email: user.Email,
        Role:user.Role,
    }
    return JWT.sign(payload, code);
}
function validateToken(token) {
    return JWT.verify(token, code);
}
module.exports = { createToken, validateToken };