import React, { Component } from 'react';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import './home.css';

class Register extends Component {
  deals = [];
  products = [];
  departments = [];

  constructor() {
    super();
    this.state = { departments: [], deals: [], products: [] };
  }

  componentDidMount() {
    fetch(`${apiUrl}/deals?_limit=6`, getRequest)
      .then(response => response.json())
      .then(response => this.setState({ deals: response }));

    fetch(`${apiUrl}/products?_limit=6`, getRequest)
      .then(response => response.json())
      .then(response => this.setState({ products: response }));

    fetch(`${apiUrl}/departments`, getRequest)
      .then(response => response.json())
      .then(response => this.setState({ departments: response }));
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="form-group row search">
          <div className="col-11">
            <input type="text" name="search" placeholder="What product are you interested in?" className="form-control search__input" />
          </div>
          <div className="col-1">
            <button tyle="submit" className="btn btn-dark search__button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="sidebar col-2">
            <div>
              <ul className="departmentList">
                {this.state.departments.map(department => (
                  <li key={department.name} className="department">
                    <a href="">{department.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="offers col">
            <div className="row deals">
              {this.state.deals.map(deal => (
                <div className="card" key={deal.productname}>
                  <img src="https://www.w3schools.com/howto/img_avatar2.png" alt={deal.productname} height="180px" />
                  <div className="card-body">
                    <h5 className="card-title">{deal.productname}</h5>
                    <p className="card-text description">{deal.productdescription}</p>
                    <div>
                      <p className="card-text price">{`${deal.price} €`}</p>
                      <p className="card-text newprice">{`${deal.newprice} €`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row products">
              {this.state.products.map(product => (
                <div className="card" key={product.productname}>
                  <img src="https://www.w3schools.com/howto/img_avatar2.png" alt={product.productname} height="180px" />
                  <div className="card-body">
                    <h5 className="card-title">{product.productname}</h5>
                    <p className="card-text description">{product.productdescription}</p>
                    <div>
                      <p className="card-text newprice">{`${product.price} €`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
