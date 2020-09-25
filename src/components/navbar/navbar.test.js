import 'jsdom-global/register';
import React from 'react';
import { configure } from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router, Switch, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './navbar';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';
import { cartItemsMock } from '../../testing/mocks/cartItems.mock';

const newHistory = createBrowserHistory();
const mockStore = configureStore([]);

configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
  const setup = (initialState = {}, onlyLogo = false) => {
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <Router history={newHistory}>
          <Navbar onlyLogo={onlyLogo} />
        </Router>
      </Provider>,
    );
    return component;
  };

  it('loads', () => {
    const component = setup({ cart: { items: cartItemsMock }, login: { userLogged: 'admin' } }, false);
    expect(component.find('[className="navbar row"]').length).toEqual(1);
  });

  it('cart item number showed corectly', () => {
    const component = setup({ cart: { items: cartItemsMock }, login: { userLogged: 'admin' } }, false);
    expect(component.find('[className="navbar row"] p').text()).toEqual('3');
  });

  it('should only display logo', () => {
    const component = setup({ cart: { items: cartItemsMock }, login: { userLogged: 'admin' } }, true);
    expect(component.find('[className="navbar__avatar btn"]').length).toEqual(0);
  });

  it('should display full navbar', () => {
    const component = setup({ cart: { items: cartItemsMock }, login: { userLogged: 'admin' } }, false);
    expect(component.find('[className="navbar__avatar btn"]').length).toEqual(1);
  });

  /*it('should show dropdown menu on avatar click', () => {
    const component = setup({ cart: { items: [{ id: 1 }, { id: 2 }] }, login: { userLogged: 'admin' } }, false);
    const elem = component.find('[className="navbar__avatar btn"]');
    console.log(elem.prop('aria-expanded'));
    elem.simulate('click');
    console.log(elem.prop('aria-expanded'));
    //console.log(getComputedStyle(elem.getDOMNode()).getPropertyValue('aria-expanded'));
    //expect(component.find('[className="dropdown-menu navbar__dropdown"]').prop('style')).toHaveProperty('display', 'block');
  });*/
});
