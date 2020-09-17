import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { usernameValidation, passwordValidation, emailValidation } from '../../shared/validators/validators';
import { apiUrl, postRequest } from '../../shared/constants/constants';

import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './register.css';

const Register = () => {
  const [formControls, setFormControls] = useState({
    email: {
      value: '',
    },
    username: {
      value: '',
    },
    password: {
      value: '',
    },
  });

  const submitRegisterFormHandler = event => {
    event.preventDefault();
    const isValidUsername = usernameValidation('username', formControls.username.value);
    const isValidPasswword = passwordValidation('password', formControls.password.value);
    const isValidEmail = emailValidation('email', formControls.email.value);
    if (!isValidEmail && !isValidUsername && !isValidPasswword) {
      const body = JSON.stringify({
        username: formControls.username.value,
        email: formControls.email.value,
        password: formControls.password.value,
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

  const changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    setFormControls({
      ...formControls,
      [name]: {
        ...formControls[name],
        value,
      },
    });
  };

  return (
    <div className="flex-wrapper">
      <Navbar onlyLogo={true} />
      <div className="container register">
        <h2>Register</h2>
        <form onSubmit={submitRegisterFormHandler} autoComplete="off">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={formControls.email.value}
              name="email"
              onChange={changeHandler}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={formControls.username.value}
              name="username"
              onChange={changeHandler}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={formControls.password.value}
              name="password"
              onChange={changeHandler}
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
      <Footer />
    </div>
  );
};

export default Register;
