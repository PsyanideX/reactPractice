import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import './home.css';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  const [departments, setDepartments] = useState([]);
  const [deals, setDeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${apiUrl}/deals?_limit=6`, getRequest)
      .then(response => response.json())
      .then(response => setDeals(response));

    fetch(`${apiUrl}/products?_start=11&_limit=6`, getRequest)
      .then(response => response.json())
      .then(response => setProducts(response));

    fetch(`${apiUrl}/departments`, getRequest)
      .then(response => response.json())
      .then(response => setDepartments(response));
  }, []);

  const searchChange = event => {
    setSearch(event.target.value);
  };

  const departmentRedirect = direction => {
    history.push(direction);
  };

  console.log('RENDER HOME');
  return (
    <div className="flex-wrapper">
      <Navbar />
      <img src="https://tpc.googlesyndication.com/simgad/18165207825729868291" className="home__banner" alt="banner" />
      <div className="container-fluid">
        <div className="form-group row search">
          <div className="dropdown col-1 search__buttoncontainer">
            <button className="btn btn-dark search__button" id="dropdownMenuButton" data-toggle="dropdown">
              <i className="fas fa-bars"></i>
            </button>
            <div className="dropdown-menu department__dropdown">
              {departments.map(department => (
                <button className="dropdown-item department" key={department.name} onClick={() => departmentRedirect(`/products/${department.name}`)}>
                  {department.name}
                </button>
              ))}
            </div>
          </div>
          <div className="search__inputcontainer col-xl-10 col-bg-10 col-md-10 col-sm-9 col-9">
            <input
              type="text"
              name="search"
              placeholder="What product are you interested in?"
              onChange={searchChange}
              className="form-control search__input"
            />
          </div>
          <div className="col-1 search__buttoncontainer">
            <Link to={`/products/?search=${search}`}>
              <button tyle="submit" className="btn btn-dark search__button">
                <i className="fas fa-search"></i>
              </button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="offers col">
            <h3 className="home__dealsheader">Nuestras ofertas del día</h3>
            <div className="home__deals row">
              {deals.length > 0 ? (
                deals.map(deal => (
                  <div className="card" key={deal.productname}>
                    <div className="card__imagecontainer">
                      <img src={deal.image} alt={deal.productname} height="180px" />
                    </div>
                    <div className="card-body">
                      <Link to={`/product/${deal.id}`}>
                        <h5 className="card-title">{deal.productname}</h5>
                      </Link>
                      <p className="card-text description">{deal.productdescription}</p>
                      <div>
                        <p className="card-text price">{`${deal.price} €`}</p>
                        <p className="card-text dealprice">{`${deal.dealprice} €`}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
            <h3 className="home__productsheader">Nuestros productos destacados</h3>
            <div className="home__products row">
              {products.length > 0 ? (
                products.map(product => (
                  <div className="card" key={product.productname}>
                    <div className="card__imagecontainer">
                      <img src={product.image} alt={product.productname} height="180px" />
                    </div>
                    <div className="card-body">
                      <Link to={`/product/${product.id}`}>
                        <h5 className="card-title">{product.productname}</h5>
                      </Link>
                      <p className="card-text description">{product.productdescription}</p>
                      <div>
                        <p className="card-text dealprice">{`${product.price} €`}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Home);
