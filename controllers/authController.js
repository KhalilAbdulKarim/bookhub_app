const{authenticateUser,authenticateAuthor} = require("../services/authService");
const { validationResult } = require("express-validator");

const authenticateUserController =  async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {userEmail,userPassword} = req.body;

    try{
        const authUser = await authenticateUser(userEmail,userPassword);
        res.render("loginPage",authUser)
    }catch(error){
        res.status(500).json({ error: error?.message });
    }
    
}

const authenticateAuthorController =  async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {authorEmail,authorPassword} = req.body;

    try{
        const authAuthor = await authenticateAuthor(authorEmail,authorPassword);
        res.render("loginPage",authAuthor);
    }
    catch(error){
        res.status(500).json({ error: error?.message });
    }
    
}

module.exports = {
    authenticateUserController,
    authenticateAuthorController,
}