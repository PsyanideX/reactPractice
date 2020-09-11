import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar row">
        <div className="col-10">
          <Link to="/home">
            <h1 className="navbar__title col-10">Ecommerce</h1>
          </Link>
        </div>

        <div className="col-1">
          <a className="navbar__cart btn btn-default">
            Cart
            <i className="fas fa-shopping-cart"></i>
          </a>
        </div>
        <div className="col-1">
          <a className="navbar__avatar btn">
            <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="avatar" />
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
