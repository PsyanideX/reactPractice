import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { usernameValidation, passwordValidation, emailValidation } from '../../shared/validators/validators';
import { apiUrl, postRequest } from '../../shared/constants/constants';
import './register.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      formControls: {
        email: {
          value: '',
        },
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
    const isValidEmail = emailValidation('email', this.state.formControls.email.value);
    if (!isValidEmail && !isValidUsername && !isValidPasswword) {
      const body = JSON.stringify({
        username: this.state.formControls.username.value,
        email: this.state.formControls.email.value,
        password: this.state.formControls.password.value,
      });
      fetch(`${apiUrl}/users`, { ...postRequest, body: body }).then(response => {
        if (response.status === 201) {
          console.log('User added');
        }
        return response.json();
      });
    } else {
      console.log(isValidEmail);
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
      <div className="container register">
        <h2>Register</h2>
        <form onSubmit={this.submitRegisterFormHandler} autoComplete="off">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={this.state.formControls.email.value}
              name="email"
              onChange={this.changeHandler}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={this.state.formControls.username.value}
              name="username"
              onChange={this.changeHandler}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              ref={this.state.formControls.password.value}
              name="password"
              onChange={this.changeHandler}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <p>Already have an account?</p>
        <Link to="/login">
          <button type="button" className="btn btn-secondary">
            Login
          </button>
        </Link>
      </div>
    );
  }
}

export default Register;
