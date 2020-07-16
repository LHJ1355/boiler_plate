import axios from 'axios'
import {USER_SERVER} from '../components/Config'

function loginUser(dataToSubmit){
    const req = axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then((res) => res.data)  
    .catch(err => console.log(err));
    
    return {
        type : "LOGIN_USER",
        payload : req
    }
}

function signupUser(dataToSubmit){
    const req = axios.post(`${USER_SERVER}/signup`, dataToSubmit)
    .then((res) => res.data)  
    .catch(err => console.log(err));
    
    return {
        type : "SIGNUP_USER",
        payload : req
    }
}

function auth(){
    const req = axios.get(`${USER_SERVER}/auth`)
    .then(res => res.data)
    .catch(err => console.log(err));

    return {
        type : "AUTH_USER",
        payload : req
    }
}

export {loginUser, signupUser, auth}