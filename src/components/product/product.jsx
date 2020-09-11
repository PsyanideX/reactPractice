import React, { Component } from 'react';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './product.css';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      product: {
        id: 0,
        productname: '',
        productdescription: '',
        price: '',
        department: '',
        image: '',
      },
      avatars: [
        'https://www.w3schools.com/howto/img_avatar2.png',
        'https://www.w3schools.com/howto/img_avatar1.png',
        'https://www.w3schools.com/howto/img_avatar3.png',
      ],
    };
  }

  addOneUnity = () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };

  substractOneUnity = () => {
    let newQuantity = this.state.quantity > 1 ? this.state.quantity - 1 : 1;
    this.setState({ quantity: newQuantity });
  };

  componentDidMount() {
    let productId = this.props.match.params.productId;
    const url = `${apiUrl}/products/${productId}`;
    fetch(url, getRequest)
      .then(response => response.json())
      .then(response => this.setState({ product: response }));
  }

  render() {
    return (
      <div className="flex-wrapper">
        <Navbar />
        <div className="container">
          <div className="row">
            <img src="https://www.w3schools.com/howto/img_avatar2.png" alt={this.state.product.productname} className="product__image" />
            {/*<div className="carousel slide">
              <div className="carousel-inner">
                {this.state.avatars.map((avatar, i) => (
                  <div className="carousel-item" key={`avatar${i}`}>
                    <img src={avatar} alt={this.state.product.productname} className="product__image" />
                  </div>
                ))}
              </div>
                </div>*/}
            <div className="product-details">
              <h2>{this.state.product.productname}</h2>
              <p>Descripción del artículo:</p>
              <p>{this.state.product.productdescription}</p>
              <h4>{this.state.product.price}€</h4>
              <div className="buy-buttons">
                <button className="btn btn-default">Añadir a la cesta</button>
                <button className="btn btn-default">Comprar</button>
              </div>
              <p>Cantidad:</p>
              <div className="btn-group">
                <button className="btn quantity-buttons" onClick={this.substractOneUnity}>
                  <i className="far fa-minus-square"></i>
                </button>
                <input type="text" value={this.state.quantity} className="form-control product__quantity" />
                <button className="btn quantity-buttons" onClick={this.addOneUnity}>
                  <i className="far fa-plus-square"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Product;