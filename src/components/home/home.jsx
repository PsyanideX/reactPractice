import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import './home.css';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

const Home = () => {
  const [departments, setDepartments] = useState([]);
  const [deals, setDeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${apiUrl}/deals?_limit=6`, getRequest)
      .then(response => response.json())
      .then(response => setDeals(response));

    fetch(`${apiUrl}/products?_limit=6`, getRequest)
      .then(response => response.json())
      .then(response => setProducts(response));

    fetch(`${apiUrl}/departments`, getRequest)
      .then(response => response.json())
      .then(response => setDepartments(response));
  }, []);

  const searchChange = event => {
    setSearch(event.target.value);
  };

  return (
    <div className="flex-wrapper">
      <Navbar />
      <div className="container-fluid">
        <div className="form-group row search">
          <div className="dropdown col-1">
            <button className="btn btn-dark search__button" id="dropdownMenuButton" data-toggle="dropdown">
              <i className="fas fa-bars"></i>
            </button>
            <div className="dropdown-menu department__dropdown">
              {departments.map(department => (
                <a href={`/products/${department.name}`} key={department.name} className="dropdown-item department">
                  {department.name}
                </a>
              ))}
            </div>
          </div>
          <div className="col-10">
            <input
              type="text"
              name="search"
              placeholder="What product are you interested in?"
              onChange={searchChange}
              className="form-control search__input"
            />
          </div>
          <div className="col-1">
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
              {deals.map(deal => (
                <div className="card" key={deal.productname}>
                  <img src="https://www.w3schools.com/howto/img_avatar2.png" alt={deal.productname} height="180px" />
                  <div className="card-body">
                    <h5 className="card-title">{deal.productname}</h5>
                    <p className="card-text description">{deal.productdescription}</p>
                    <div>
                      <p className="card-text price">{`${deal.price} €`}</p>
                      <p className="card-text dealprice">{`${deal.dealprice} €`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="home__productsheader">Nuestros productos destacados</h3>
            <div className="home__products row">
              {products.map(product => (
                <div className="card" key={product.productname}>
                  <img src="https://www.w3schools.com/howto/img_avatar2.png" alt={product.productname} height="180px" />
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
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
