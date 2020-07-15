import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {signupUser} from '../../_actions/user_action'

export default function(props){
    const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [Password , setPassword] = useState('');
    const [Name, setName] = useState('');
    const [ConfirmPassword , setConfirmPassword] = useState('');
    
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword) alert("비밀번호와 확인은 같아야 합니다.")
        
        let body = {
            name : Name,
            email : Email,
            password : Password
        }    

        dispatch(signupUser(body))
        .then((res) => {
            if(res.payload.signinSuccess) props.history.push('/login');
            else alert('SignIn Failed');
        });
        
    }
    return (
        <div style={{
            display : 'flex', justifyContent : 'center',
            alignItems : 'center', width : '100%', height : '100vh'
        }}>
            <form style={{display : 'flex', flexDirection : 'column'}}
                onSubmit={onSubmitHandler}>
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <br/>
                <button>SignIn</button>
            </form>
        </div>
    )
}