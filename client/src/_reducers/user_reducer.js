export default function(state={}, action){
    switch(action.type){
        case 'LOGIN_USER' : 
            return {...state, loginSuccess : action.payload }
            break;
        case 'SIGNUP_USER' : 
            return {...state, signupSuccess : action.payload }
            break;
        case 'AUTH_USER' : 
            return {...state, authData : action.payload }
            break;
        default :
            return state;
    }
}