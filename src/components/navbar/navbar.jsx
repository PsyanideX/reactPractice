import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

import { selectLogin } from '../../core/store/reducers/loginSlice';
import { selectItems } from '../../core/store/reducers/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { loggedOut } from '../../core/store/reducers/loginSlice';

const Navbar = ({ onlyLogo = false }) => {
  const userLogged = useSelector(selectLogin);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(loggedOut());
  };

  console.log('RENDER NAVBAR');
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
                <div className="cart__counter">
                  <p>{items.length ? items.length : null}</p>
                </div>
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
              {userLogged ? (
                <React.Fragment>
                  <Link to="/home" className="dropdown-item">
                    Favoritos
                  </Link>
                  <Link to={`/orders/${userLogged}`} className="dropdown-item">
                    Pedidos
                  </Link>
                  <button className="dropdown-item button__logout" onClick={logOut} href="#">
                    Cerrar sesión
                  </button>
                </React.Fragment>
              ) : (
                <Link to="/login" className="dropdown-item">
                  Inicia sesión
                </Link>
              )}
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </nav>
  );
};

export default React.memo(Navbar);
