import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import Searchbar from '../searchbar/searchbar';
import './products.css';

const Products = props => {
  const [department, setDepartment] = useState('');
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let department = props.match.params.department;
    setDepartment(department);
    if (!department) {
      setSearchQuery(new URLSearchParams(window.location.search).get('search'));
      let url = `${apiUrl}/products/?productdescription_like=${searchQuery}`;
      fetch(url, getRequest)
        .then(response => response.json())
        .then(response => setProducts(response));
    } else {
      department = department.charAt(0).toUpperCase() + department.slice(1).toLowerCase();
      let url = department ? `${apiUrl}/products/?department=${department}` : `${apiUrl}/products`;
      fetch(url, getRequest)
        .then(response => response.json())
        .then(response => setProducts(response));
    }
  }, [props.match.params.department, searchQuery]);

  const handleSearch = search => {
    setSearchQuery(search);
  };

  return (
    <div className="flex-wrapper">
      <Navbar />
      <div className="container">
        <Searchbar onSearch={handleSearch} />
        {department ? (
          <h1 className="products__departmentheader">{department}</h1>
        ) : (
          <h1 className="products__departmentheader">Búsqueda: "{searchQuery}"</h1>
        )}
        <div className="row products__products">
          {products.length > 0 ? (
            products.map((product, i) => (
              <div className="card" key={`${product.productname}${i}`}>
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
            <h1>No hay ningún producto que coincida con la búsqueda, lo sentimos.</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Products);
