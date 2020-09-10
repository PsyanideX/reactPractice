import React, { Component } from 'react';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './products.css';

class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    let department = this.props.match.params.department;
    department = department ? department.charAt(0).toUpperCase() + department.slice(1).toLowerCase() : null;
    let url = department ? `${apiUrl}/products/?department=${department}` : `${apiUrl}/products`;
    fetch(url, getRequest)
      .then(response => response.json())
      .then(response => this.setState({ products: response }));
  }

  render() {
    return (
      <div className="flex-wrapper">
        <Navbar />
        <div className="container">
          <div className="row products">
            {this.state.products.map(product => (
              <div className="card" key={product.productname}>
                <img src="https://www.w3schools.com/howto/img_avatar2.png" alt={product.productname} height="180px" />
                <div className="card-body">
                  <h5 className="card-title">{product.productname}</h5>
                  <p className="card-text description">{product.productdescription}</p>
                  <div>
                    <p className="card-text price">{`${product.price} €`}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Products;
