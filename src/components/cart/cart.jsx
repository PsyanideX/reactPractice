import React, { Component } from 'react';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './cart.css';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [
        {
          id: 0,
          productname: '',
          productdescription: '',
          price: 0,
          quantity: 0,
        },
      ],
    };
  }

  componentDidMount() {
    const cartMock = [
      {
        id: 0,
        productname: 'Lavadora',
        productdescription: 'Lavadora Balay 7 kg',
        price: 380,
        quantity: 1,
      },
      {
        id: 3,
        productname: 'Smartphone',
        productdescription: 'Smartphone Xiaomi mi 10',
        price: 499,
        quantity: 1,
      },
      {
        id: 18,
        productname: 'Bateria Externa',
        productdescription: 'BAteria externa 10000mAh 2 USB 2.1A',
        price: 15,
        quantity: 3,
      },
      {
        id: 25,
        productname: 'Television',
        productdescription: 'Television 24 1080p',
        price: 99,
        quantity: 1,
      },
    ];
    this.setState({ cart: cartMock });
  }

  calculateTotalProducts() {
    let calculateTotalProducts = 0;
    this.state.cart.forEach(element => (calculateTotalProducts += element.quantity));
    return calculateTotalProducts;
  }

  calculateTotalPrice() {
    let calculateTotalPrice = 0;
    this.state.cart.forEach(element => (calculateTotalPrice += element.price));
    return calculateTotalPrice;
  }

  render() {
    return (
      <div className="flex-wrapper">
        <Navbar />
        <div className="container">
          <h2>Carrito de la compra</h2>
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Descripción</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cart.map((product, i) => (
                <tr key={product.id}>
                  <th scope="row">{i}</th>
                  <td>{product.productname}</td>
                  <td>{product.productdescription}</td>
                  <td>{product.quantity}</td>
                  <td>{`${product.price} €`}</td>
                </tr>
              ))}
              <tr>
                <th colSpan="3">Total:</th>
                <td>{this.calculateTotalProducts()}</td>
                <td>{`${this.calculateTotalPrice()} €`}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Cart;
