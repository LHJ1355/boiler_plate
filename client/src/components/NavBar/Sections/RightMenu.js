/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { withRouter , Link} from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.data.logoutSuccess) {
        if(window.localStorage.getItem('userId')) window.localStorage.removeItem('userId');
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.authData && !user.authData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          {/*<a href="/login">Signin</a>*/}
          <Link to='/login'>Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          {/*<a href="/signup">Signup</a>*/}
          <Link to='/signup'>Signip</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

