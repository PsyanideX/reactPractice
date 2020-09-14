import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar row">
        <div className="col-xl-10 col-bg-9 col-md-8 col-sm-7 col-6">
          <Link to="/home">
            <h1 className="navbar__title col-10">Ecommerce</h1>
          </Link>
        </div>

        <div className="col-xl-1 col-bg-1 col-md-2 col-sm-3 col-3">
          <Link to="/cart">
            <button className="navbar__cart btn btn-dark">
              <i className="fas fa-shopping-cart"></i>
            </button>
          </Link>
        </div>
        <div className="col-xl-1 col-bg-2 col-md-2 col-sm-2 col-3">
          <a className="navbar__avatar btn">
            <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="avatar" />
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
