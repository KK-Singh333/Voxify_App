const {createHmac, randomBytes } = require('crypto')
const { Schema, model } = require('mongoose');
const { createToken } = require("../Services/jwtAuth.js");
const userSchema = new Schema({
    Name: {
        type: String,
        required:true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Salt:{
    type: String,
    },
    Password: {
        type: String,
        required:true,
    },
    Role: {
        type: String,
        enum: ["AUTHOR", "VIEWER"],
        default:"VIEWER",
    },
}, { timestamps: true });
userSchema.pre('save', function (next) { 
    const user = this;
    if (!user.isModified('Password')) return;
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.Password).digest('hex');
    this.Salt = salt;
    this.Password = hashedPassword;
    next();

})
userSchema.static("checkPassword", async function (email, password) {
    const user = await this.findOne({ Email : email });
    if (!user) throw new Error("user not found");
    const salt = user.Salt;
    const hashedPassword = user.Password;
    const checkPassword = createHmac("sha256", salt)
      .update(password)
        .digest("hex");
    if (checkPassword === hashedPassword) {
        return createToken(user);
    }
    else throw new Error("incorrect password");
 } )


const User = model('user', userSchema);
module.exports = User;
