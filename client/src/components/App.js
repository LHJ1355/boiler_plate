import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import RandingPage from './LandingPage/LandingPage';
import LoginPage from './LoginPage/LoginPage'
import SignupPage from './SignupPage/SignupPage'
import Auth from '../hoc/auth';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';

function App() {
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
