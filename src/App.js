import React from 'react';
import { Switch,  Route } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';


function App() {
    return (
        <div>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </div>
    )
}

export default App;