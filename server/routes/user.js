const express = require('express');
const router = express.Router();
const {User} = require('../models/User')
const {Auth} = require('../middleware/Auth')

router.get('/auth', Auth, (req, res) => {
    res.status(200).json({isAuth : true, isAdmin : req.user.role === 0 ? false : true});
})

router.post('/login', (req, res) => {
    User.findOne({email : req.body.email}, (err, user) => {
        if(err) return res.status(400).send(err);
        if(!user) {
            return res.status(200).json({
                loginSuccess : false, 
                message : "해당하는 이메일이 없습니다."
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(err) return res.status(400).send(err);
            if(!isMatch){
                return res.status(200).json({ 
                    loginSuccess : false, 
                    message : "비밀번호가 틀렸습니다."
                })
            }

            user.genToken((err, token) => {
                if(err) res.status(400).send(err);
                res.status(200).cookie("w_auth" , token).json({ loginSuccess : true, userId : token});
            })
        })

    })
})

router.get('/logout', Auth, (req, res) => {
    User.findOneAndUpdate({_id : req.user._id}, {token : ""}, (err, doc) => {
        if(err) return res.json({logoutSuccess : false, err : err});
        res.status(200).json({logoutSuccess : true});
    })
})

router.post('/signup', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({ signupSuccess : false, err : err});
        res.status(200).json({signupSuccess : true})
    })
})

module.exports = router;