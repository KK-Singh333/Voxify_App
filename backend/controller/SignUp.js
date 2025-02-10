const User  = require('../models/user');
async function handleSignUp(req, res) {
    
    const { Name, Email, Password, Role } = req.body;
    console.log(`Name ${Name} Email ${Email} Pass ${Password} Role ${Role}`);
    
    try {
        await User.create({
            Name: Name,
            Email: Email,
            Password: Password,
            Role: Role,
        })
        
        return res.json({ redirecturl: "/login" ,errorflag:"no"});
        
    }
    catch(error) { 
        return res.json({ redirecturl: "", errorflag: "yes" });
        
    }
}
module.exports = handleSignUp;