const config = require('config');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, config.get('JWT_SEC'), (err, user) => {
            if (err) return next(new ErrorResponse("Token is not valid!", 404))
            req.user = user;
            next();
        });
    } else {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ msg: 'Unauthorized access!' });
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ msg: 'Unauthorized access!' });
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
