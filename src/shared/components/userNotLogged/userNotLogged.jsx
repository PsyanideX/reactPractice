import React from 'react';
import { Link } from 'react-router-dom';
import './userNotLogged.css';

const UserNotLogged = () => {
  return (
    <div className="container not-logged">
      <h3>Para entrar aquí tienes que estar logeado.</h3>
      <Link to="/login">
        <button type="button" className="btn gotologin__button">
          Ir a login
        </button>
      </Link>
    </div>
  );
};

export default UserNotLogged;
