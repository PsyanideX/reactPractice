import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './cart.css';
import { apiUrl, postRequest } from '../../shared/constants/constants';
import { removeItem, selectItems } from '../../core/store/reducers/cartSlice';
import { selectLogin } from '../../core/store/reducers/loginSlice';
import UserNotLogged from '../../shared/components/userNotLogged/userNotLogged';

const Cart = () => {
  const history = useHistory();
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

  const buyProducts = () => {
    let productIds = cart.map(item => item.id);
    let body = JSON.stringify({
      user: userLogged,
      productIds: productIds,
      totalPrice: calculateTotalPrice(),
      date: getCurrentDate(),
    });
    fetch(`${apiUrl}/orders`, { ...postRequest, body: body }).then(response => {
      if (response.status === 201) {
        history.push('/home');
        alert('Compra realizada');
      }
      return response.json();
    });
  };

  const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today;
  };

  return (
    <div className="flex-wrapper">
      <Navbar />
      {userLogged ? (
        <div className="container">
          {cart.length > 0 ? (
            <div className="cart__tablecontainer">
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
              <button className="btn buy__button" onClick={buyProducts}>
                Realizar pedido
              </button>
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
