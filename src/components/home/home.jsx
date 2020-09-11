import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import './home.css';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

class Home extends Component {
  deals = [];
  products = [];
  departments = [];

  constructor() {
    super();
    this.state = { departments: [], deals: [], products: [], search: '' };
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

  searchChange = event => {
    this.setState({
      search: event.target.value,
    });
  };

  render() {
    return (
      <div className="flex-wrapper">
        <Navbar />
        <div className="container-fluid">
          <div className="form-group row search">
            <div className="col-11">
              <input
                type="text"
                name="search"
                placeholder="What product are you interested in?"
                onChange={this.searchChange}
                className="form-control search__input"
              />
            </div>
            <div className="col-1">
              <Link to={`/products/?search=${this.state.search}`}>
                <button tyle="submit" className="btn btn-dark search__button">
                  <i className="fas fa-search"></i>
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="sidebar col-2">
              <div>
                <h2>Departments</h2>
                <ul className="departmentList">
                  {this.state.departments.map(department => (
                    <li key={department.name} className="department">
                      <Link to={`/products/${department.name}`}>
                        <p>{department.name}</p>
                      </Link>
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
                        <p className="card-text dealprice">{`${deal.dealprice} €`}</p>
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
  }
}

export default Home;
