import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './orders.css';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import { selectLogin } from '../../core/store/reducers/loginSlice';
import UserNotLogged from '../../shared/components/userNotLogged/userNotLogged';

const Orders = () => {
  const userLogged = useSelector(selectLogin);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = productIds => {
    setProducts([]);
    productIds.map(id => {
      fetch(`${apiUrl}/products/${id}`, getRequest)
        .then(response => response.json())
        .then(response => setProducts());
    });
  };

  useEffect(() => {
    fetch(`${apiUrl}/orders?user=${userLogged}`, getRequest)
      .then(response => response.json())
      .then(response => setOrders(response));
  }, []);

  console.log('RENDER ORDERS');
  return (
    <div className="flex-wrapper">
      <Navbar />
      {userLogged ? (
        <div className="container">
          {orders.length > 0 ? (
            <div className="cart__tablecontainer">
              <h2>Lista de pedidos</h2>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Productos</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={i}>
                      <th scope="row">{i}</th>
                      <td className="dropdown">
                        {/*<button
                          className="btn dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          onClick={() => getProducts(order.productIds)}
                          {order.productIds.map(id => `${id},  `)}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"></div>
                        >*/}
                        {order.productIds.map(id => `${id},  `)}
                      </td>
                      <td>{`${order.totalPrice} €`}</td>
                      <td>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h3>¡No hay ningun pedido!</h3>
          )}
        </div>
      ) : (
        <UserNotLogged />
      )}
      <Footer />
    </div>
  );
};

export default Orders;
