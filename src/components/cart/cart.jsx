import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './cart.css';
import { removeItem, selectItems } from '../../core/store/reducers/cartSlice';

const Cart = () => {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const [cart, setCart] = useState([
    {
      id: 0,
      productname: '',
      productdescription: '',
      price: 0,
      quantity: 0,
    },
  ]);

  useEffect(() => {
    setCart(items);
  }, []);

  const calculateTotalProducts = () => {
    let calculateTotalProducts = 0;
    cart.forEach(element => (calculateTotalProducts += element.quantity));
    return calculateTotalProducts;
  };

  const calculateTotalPrice = () => {
    let calculateTotalPrice = 0;
    cart.forEach(element => (calculateTotalPrice += element.price));
    return calculateTotalPrice;
  };

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
            {cart.map((product, i) => (
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
              <td>{calculateTotalProducts()}</td>
              <td>{`${calculateTotalPrice()} €`}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
