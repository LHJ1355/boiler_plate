const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRound = 10;

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    lastname : {
        type : String,
        maxlength : 50,
    },
    email : {
        type : String,
        trim : true,
        unique : 1,
    },
    password : {
        type : String,
        minlength : 8,
    },
    role : {
        type : Number,
        default : 0, // 0이면 일반유저, 1이면 관리자
    },
    profileimage : {
        type : String
    },
    token : {
        type : String, //로그인 시 토큰 생성, 로그아웃 시 토큰 삭제 //토큰의 유,무로 로그인 상태 확인 가능
                        //요청에 대한 인증, 권한 검증 가능
    },
    tokenExp : {
        type : Number //토큰 만료기간
    }
})

userSchema.pre('save', function( next ) {
    var user = this;
    if(user.isModified('password')){    
        bcrypt.genSalt(saltRound, function(err, salt){
            if(err) return next(err);
        
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb){
    var user = this;

    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.genToken = function(cb){
    user = this;
    const token = jwt.sign(user._id.toHexString(), 'secret');

    user.token = token;
    user.save((err, doc) => {
        if(err) return cb(err);
        cb(null, doc.token);
    })
}
const User = mongoose.model('User', userSchema);
module.exports = {User} ;