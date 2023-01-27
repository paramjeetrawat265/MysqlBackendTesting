var jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    console.log(req.headers.authorization);
    const token = req.headers?.authorization;
    try {
        jwt.verify(token, 'shhh', function (err, decoded) {
            if (err) {
                console.log(err)
            }
            console.log(decoded.foo) // bar
        });
        next();
    }
    catch (err) {
        res.send("Please login again")
    }
}

module.exports = auth;