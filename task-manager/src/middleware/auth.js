const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, "thisisit");
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            res.status(404).send({ error: 'user not found'});
        };
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'please authenticate.'});
    };
};
module.exports = auth;