const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);
module.exports = {User} ;