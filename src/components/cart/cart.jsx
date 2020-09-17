import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './cart.css';
import { removeItem, selectItems } from '../../core/store/reducers/cartSlice';
import { selectLogin } from '../../core/store/reducers/loginSlice';
import UserNotLogged from '../../shared/components/userNotLogged/userNotLogged';

const Cart = () => {
  const items = useSelector(selectItems);
  const userLogged = useSelector(selectLogin);
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
  }, [items]);

  const calculateTotalProducts = () => {
    let calculateTotalProducts = 0;
    cart.forEach(element => (calculateTotalProducts += element.quantity));
    return calculateTotalProducts;
  };

  const calculateTotalPrice = () => {
    let calculateTotalPrice = 0;
    cart.forEach(element => (calculateTotalPrice += element.price * element.quantity));
    return calculateTotalPrice;
  };

  const removeItemfromCart = id => {
    dispatch(removeItem(id));
  };

  return (
    <div className="flex-wrapper">
      <Navbar />
      {userLogged ? (
        <div className="container">
          {cart.length > 0 ? (
            <div class="cart__tablecontainer">
              <h2>Carrito de la compra</h2>
              <table className="table table-sm table-responsive">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product, i) => (
                    <tr key={product.id}>
                      <th scope="row">{i}</th>
                      <td>{product.productname}</td>
                      <td>{product.productdescription}</td>
                      <td>{product.quantity}</td>
                      <td>{`${product.price * product.quantity} €`}</td>
                      <td>
                        <button className="btn" onClick={() => removeItemfromCart(product)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="3">Total:</th>
                    <td>{calculateTotalProducts()}</td>
                    <td>{`${calculateTotalPrice()} €`}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <h3>¡El carrito está vacio!</h3>
          )}
        </div>
      ) : (
        <UserNotLogged />
      )}
      <Footer />
    </div>
  );
};

export default Cart;
