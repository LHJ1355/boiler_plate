import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../_actions/user_action'
export default function(props){
    const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [Password , setPassword] = useState('');
    const [Checked, setChecked] = useState(false);

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onCheckedHandler = (event) => {
        setChecked(event.currentTarget.checked);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email : Email,
            password : Password
        }    
        dispatch(loginUser(body))
        .then((res) => {
            if(res.payload.loginSuccess) {
                if(Checked) window.localStorage.setItem('userId', res.payload.userId);
                props.history.push('/');
            } else alert('Login Failed');
        });
        
    }
    
    return (
        <div style={{
            display : 'flex', justifyContent : 'center',
            alignItems : 'center', width : '100%', height : '100vh'
        }}>
            <form style={{display : 'flex', flexDirection : 'column'}}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <input type="checkbox" checked={Checked} onChange={onCheckedHandler}/>
                <br/>
                <button>Login</button>
            </form>
        </div>
    )
}