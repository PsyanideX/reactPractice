import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Notifications, { notify } from 'react-notify-toast';
import { usernameValidation, passwordValidation } from '../../shared/validators/validators';
import { apiUrl, getRequest } from '../../shared/constants/constants';

import { useDispatch } from 'react-redux';
import { loggedIn } from '../../core/store/reducers/loginSlice';

import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './login.css';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formControls, setFormControls] = useState({
    username: {
      value: '',
    },
    password: {
      value: '',
    },
  });
  const login = username => {
    dispatch(loggedIn(username));
    history.push('/home');
  };

  const submitLoginFormHandler = event => {
    console.log('############################################################################');
    event.preventDefault();
    const isValidUsername = usernameValidation('username', formControls.username.value);
    const isValidPasswword = passwordValidation('password', formControls.password.value);
    let username = formControls.username.value;
    let password = formControls.password.value;
    if (!isValidUsername && !isValidPasswword) {
      fetch(`${apiUrl}/users/?username=${formControls.username.value}`, { ...getRequest })
        .then(response => response.json())
        .then(response => {
          if (response[0] && response[0].username === username && response[0].password === password) {
            login(username);
          } else {
            notify.show('Usuario o contraseña incorrectos', 'error', 3000);
          }
        });
    } else {
      notify.show('El usuario o la contraseña no cumplen los requisitos', 'error', 3000);
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
      <Notifications />
      <Navbar onlyLogo={true} />
      <div className="container login">
        <h2>Login</h2>
        <form onSubmit={submitLoginFormHandler} autoComplete="off">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Username"
              value={formControls.username.value}
              name="username"
              onChange={changeHandler}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={formControls.password.value}
              name="password"
              onChange={changeHandler}
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
      <Footer />
    </div>
  );
};

export default Login;
