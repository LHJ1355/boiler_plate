import React, {useEffect} from 'react';
import axios from 'axios'

export default function LandingPage(LoginPage, option){
    const onClickHandler = () => {
        axios.get('/api/user/logout')
        .then((res) => {
            if(res.data.logoutSuccess){
                console.log(res);
                //props.history.push('/login');
            }else {
                alert("로그아웃에 실패했습니다.");
            }

        });
    }
    return (
        <div style={{
            display : 'flex', justifyContent : 'center',
            alignItems : 'center', width : '100%', height : '100vh'
        }}>
            <h2>시작페이지</h2>
            <button onClick={onClickHandler}>logout</button>
        </div>
    )
}
