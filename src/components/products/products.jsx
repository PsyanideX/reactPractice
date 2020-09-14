import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './products.css';

class Products extends Component {
  constructor() {
    super();
    this.state = {
      department: '',
      products: [],
    };
  }

  componentDidMount() {
    let searchQuery = new URLSearchParams(window.location.search).get('search');
    if (searchQuery) {
      let url = `${apiUrl}/products/?productdescription_like=${searchQuery}`;
      fetch(url, getRequest)
        .then(response => response.json())
        .then(response => this.setState({ products: response }));
    } else {
      let department = this.props.match.params.department;
      this.setState({ department: department });
      department = department ? department.charAt(0).toUpperCase() + department.slice(1).toLowerCase() : null;
      let url = department ? `${apiUrl}/products/?department=${department}` : `${apiUrl}/products`;
      fetch(url, getRequest)
        .then(response => response.json())
        .then(response => this.setState({ products: response }));
    }
  }

  render() {
    return (
      <div className="flex-wrapper">
        <Navbar />
        <div className="container">
          <h1 class="products__departmentheader">{this.state.department}</h1>
          <div className="row products__products">
            {this.state.products.length > 0 ? (
              this.state.products.map(product => (
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
              ))
            ) : (
              <h1>No hay ningún producto que coincida con la búsqueda, lo sentimos.</h1>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Products;
