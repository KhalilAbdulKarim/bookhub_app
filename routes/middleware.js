const jwt = require("jsonwebtoken");
//bearer authentication

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers('authorization');
    const token = authHeader && authHeader.split('')[1];
    // no key(token) back to the main
    if (token == null) {
        //401 unauthorized
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.SECRET_KEY, (err,user) => {
        if (err) {
            // user known , but forbidden ,token expired
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });


}

module.exports = authenticateToken;