import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  submitFormHandler = event => {
    event.preventDefault();
    console.log(this.refs.username.value);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitFormHandler}>
          <fieldset>
            <legend>Login</legend>
            <input type="text" placeholder="Username" ref="username" />
            <input type="text" placeholder="Password" ref="password" />
            <button type="submit">Login</button>
          </fieldset>
        </form>
        <p>Need an account?</p>
        <Link to="/register">
          <button type="button">Register</button>
        </Link>
      </div>
    );
  }
}

export default Login;
