import axios from 'axios'
function loginUser(dataToSubmit){
    const req = axios.post('/api/user/login', dataToSubmit)
    .then((res) => res.data)  
    .catch(err => console.log(err));
    
    return {
        type : "LOGIN_USER",
        payload : req
    }
}

function signupUser(dataToSubmit){
    const req = axios.post('/api/user/signup', dataToSubmit)
    .then((res) => res.data)  
    .catch(err => console.log(err));
    
    return {
        type : "SIGNUP_USER",
        payload : req
    }
}

function auth(){
    const req = axios.get('/api/user/auth')
    .then(res => res.data)
    .catch(err => console.log(err));

    return {
        type : "AUTH_USER",
        payload : req
    }
}

export {loginUser, signupUser, auth}