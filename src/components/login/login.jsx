import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { usernameValidation, passwordValidation } from '../../shared/validators/validators';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import './login.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      formControls: {
        username: {
          value: '',
        },
        password: {
          value: '',
        },
      },
    };
  }
  submitRegisterFormHandler = event => {
    event.preventDefault();
    const isValidUsername = usernameValidation('username', this.state.formControls.username.value);
    const isValidPasswword = passwordValidation('password', this.state.formControls.password.value);
    let username = this.state.formControls.username.value;
    let password = this.state.formControls.password.value;
    if (!isValidUsername && !isValidPasswword) {
      fetch(`${apiUrl}/users/?username=${this.state.formControls.username.value}`, { ...getRequest })
        .then(response => response.json())
        .then(response => {
          if (response[0].username === username && response[0].password === password) {
            console.log('LOGIN');
          }
        });
    } else {
      console.log(isValidUsername);
      console.log(isValidPasswword);
    }
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      formControls: {
        ...this.state.formControls,
        [name]: {
          ...this.state.formControls[name],
          value,
        },
      },
    });
  };

  render() {
    return (
      <div className="container login">
        <h2>Login</h2>
        <form onSubmit={this.submitRegisterFormHandler} autoComplete="off">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Username"
              value={this.state.formControls.username.value}
              name="username"
              onChange={this.changeHandler}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Password"
              ref={this.state.formControls.password.value}
              name="password"
              onChange={this.changeHandler}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <p>Already have an account?</p>
          <Link to="/register">
            <button type="button" className="btn">
              Register
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Register;
