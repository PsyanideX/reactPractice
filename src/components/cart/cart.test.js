import 'jsdom-global/register';
import React from 'react';
import { configure } from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router, Switch, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cart from './cart';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';
import { cartItemsMock } from '../../testing/mocks/cartItems.mock';

const newHistory = createBrowserHistory();
const mockStore = configureStore([]);

configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
  global.fetch = jest.fn(() => Promise.resolve());
  const setup = (initialState = {}) => {
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <Router history={newHistory}>
          <Cart />
        </Router>
      </Provider>,
    );
    return component;
  };

  it('loads with user logged', () => {
    const component = setup({ cart: { items: cartItemsMock }, login: { userLogged: 'admin' } });
    expect(component.find('[className="cart__tablecontainer"]').length).toEqual(1);
  });

  it('loads with user not logged', () => {
    const component = setup({ cart: { items: cartItemsMock }, login: { userLogged: '' } });
    expect(component.find('[className="cart__tablecontainer"]').length).toEqual(0);
  });

  it('counts items on cart correctly', () => {
    const component = setup({ cart: { items: cartItemsMock }, login: { userLogged: 'admin' } });
    const totalPriceElement = component.find('[className="cart__tablecontainer"] tfoot tr > td').at(0);
    const totalProductsElement = component.find('[className="cart__tablecontainer"] tfoot tr > td').at(1);
    expect(totalPriceElement.text()).toEqual('3');
    expect(totalProductsElement.text()).toEqual('803 €');
  });

  it('lets buy products', () => {
    const component = setup({ cart: { items: cartItemsMock }, login: { userLogged: 'admin' } });
    const spy = jest.spyOn(JSON, 'stringify');
    const buyButtonElement = component.find('[className="btn buy__button"]');
    buyButtonElement.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
