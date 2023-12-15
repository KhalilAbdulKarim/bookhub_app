const{authenticateUser,authenticateAuthor} = require("../services/authService");
const { validationResult } = require("express-validator");

const authenticateUserController = async (req, res) => {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     return res.status(400).render('loginPage', { errors: errors.array() });
    // }

    const { userEmail, userPassword } = req.body;

    try {
        const authUser = await authenticateUser(userEmail, userPassword);
        if (authUser) {
            res.redirect('/dashboard');
        }
         else {
            res.render('loginPage', { errorMessage: 'Invalid email or password' });
        }

    } catch (errorMessage) {
        res.render('loginPage', { errorMessage: 'Invalid email or password' });

    }
}



const authenticateAuthorController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('loginPage', { errors: errors.array() });
    }

    const { authorEmail, authorPassword } = req.body;

    try {
        const authAuthor = await authenticateAuthor(authorEmail, authorPassword);
        res.redirect('/authorDashboard');
    } catch (error) {
        res.status(500).render('loginPage', { errorMessage: error?.message });
    }
}

module.exports = {
    authenticateUserController,
    authenticateAuthorController,
}
