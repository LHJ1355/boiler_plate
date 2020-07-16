import React, {Suspense, useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import RandingPage from './LandingPage/LandingPage';
import LoginPage from './LoginPage/LoginPage'
import SignupPage from './SignupPage/SignupPage'
import Auth from '../hoc/auth';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import {USER_SERVER} from '../components/Config';
import axios from 'axios';

function App() {
  const [logged, setLogged] = useState(false);

  useEffect(() => { 
    const userId = window.localStorage.getItem('userId') ? window.localStorage.getItem('userId') : null;
    
    if(userId) {
      axios.post(`${USER_SERVER}/checkkeeplogged`, {userId : userId})
      .then(res => {
        if(res.status === 200) {
          console.log(res.data);  
          setLogged(true);
        }
      });
    }
  }, []);

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Auth(RandingPage, null)}/>
        <Route path='/login' component={Auth(LoginPage, false)}/>
        <Route path='/signup' component={Auth(SignupPage, false)}/>
      </Switch>
      <Footer />
    </Suspense>
  )
}

export default App;
