import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

import { useDispatch } from 'react-redux';
import { loggedOut } from '../../core/store/reducers/loginSlice';

const Navbar = ({ onlyLogo = false }) => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(loggedOut());
  };

  return (
    <nav className="navbar row">
      <div className="col-xl-10 col-bg-9 col-md-8 col-sm-7 col-6">
        <Link to="/home">
          <h1 className="navbar__title col-10">Ecommerce</h1>
        </Link>
      </div>

      {onlyLogo === false ? (
        <React.Fragment>
          <div className="col-xl-1 col-bg-1 col-md-2 col-sm-3 col-3">
            <Link to="/cart">
              <button className="navbar__cart btn btn-dark">
                <i className="fas fa-shopping-cart"></i>
              </button>
            </Link>
          </div>

          <div className="col-xl-1 col-bg-2 col-md-2 col-sm-2 col-3 dropdown">
            <button
              className="navbar__avatar btn"
              type="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="avatar" />
            </button>
            <div className="dropdown-menu navbar__dropdown" aria-labelledby="dropdownMenuLink">
              <Link to="/home" className="dropdown-item">
                Favoritos
              </Link>
              <a className="dropdown-item" href="#">
                Pedidos
              </a>
              <button className="dropdown-item button__logout" onClick={logOut} href="#">
                Cerrar sesión
              </button>
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </nav>
  );
};

export default Navbar;
