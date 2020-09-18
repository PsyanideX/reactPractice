import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import Home from './components/home/home';
import Products from './components/products/products';
import Product from './components/product/product';
import Cart from './components/cart/cart';
import Orders from './components/orders/orders';

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
      <Route path="/products/:department?" component={Products} />
      <Route path="/product/:productId" component={Product} />
      <Route path="/cart" component={Cart} />
      <Route path="/orders/:userId" component={Orders} />
    </Switch>
  );
}

export default App;
