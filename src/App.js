import React from 'react';
import './App.css';
import './bootstrap/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Register from './register/register.jsx';
import Login from './login/login.jsx';
import Ads from './ads/ads.jsx';
import Details from './details/details.jsx';

function App() {
  return (
    <Router>
      <div className="container">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path='/ads' component={Ads} />
        <Route path={`/details/:id`} component={Details} />
        <Route path="/register" component={Register} />
        <Redirect from="/" to='/register' />
      </Switch>
      </div>
  </Router>
  );
}

export default App;