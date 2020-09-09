import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import Home from './components/home/home';

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
    </Switch>
  );
}

export default App;
