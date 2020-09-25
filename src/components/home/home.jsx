import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import './home.css';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import Searchbar from '../searchbar/searchbar';

const Home = () => {
  const [deals, setDeals] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/deals?_limit=6`, getRequest)
      .then(response => response.json())
      .then(response => setDeals(response));

    fetch(`${apiUrl}/products?_start=11&_limit=6`, getRequest)
      .then(response => response.json())
      .then(response => setProducts(response));
  }, []);

  return (
    <div className="flex-wrapper">
      <Navbar />
      <img src="https://tpc.googlesyndication.com/simgad/18165207825729868291" className="home__banner" alt="banner" />
      <div className="container-fluid">
        <Searchbar onSearch={() => {}} />
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
