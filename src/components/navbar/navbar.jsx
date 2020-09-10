import React, { Component } from 'react';
import './navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar row">
        <h1 className="navbar__title col-10">Ecommerce</h1>
        <div className="col-1">
          <a className="btn btn-default navbar__cart">
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
