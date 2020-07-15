const jwt = require('jsonwebtoken')
const {User} = require('../models/User')

let Auth = (req, res, next) => {
    const token = req.cookies.w_auth;
    jwt.verify(token, 'secret', (err, decode) => {
        User.findOne({_id : decode, token : token}, (err, user) => {
            if(err) throw err;
            if(!user) return res.status(200).json({isAuth : false})

            req.user = user;
            next();
        })
    })
}

module.exports = {Auth};