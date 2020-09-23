import 'jsdom-global/register';
import React from 'react';
import { configure } from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router, Switch, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cart from './cart';
import createBrowserHistory from 'history/createBrowserHistory';
import configureStore from 'redux-mock-store';

const newHistory = createBrowserHistory();
const mockStore = configureStore([]);

const mockItems = [
  {
    id: 9,
    productname: 'Portatil ',
    productdescription: 'Portatil ASUS i5 16GB 1TB',
    price: 599,
    quantity: 1,
  },
  {
    id: 10,
    productname: 'Headset BT',
    productdescription: 'Auriculares BlueTooth Sony',
    price: 189,
    quantity: 1,
  },
  {
    id: 11,
    productname: 'Altavoz de bolsillo',
    productdescription: 'Altavoz 10W Xiaomi',
    price: 15,
    quantity: 1,
  },
];

configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
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
    const component = setup({ cart: { items: mockItems }, login: { userLogged: 'admin' } });
    expect(component.find('[className="cart__tablecontainer"]').length).toEqual(1);
  });

  it('loads with user not logged', () => {
    const component = setup({ cart: { items: mockItems }, login: { userLogged: '' } });
    expect(component.find('[className="cart__tablecontainer"]').length).toEqual(0);
  });

  it('counts items on cart correctly', () => {
    const component = setup({ cart: { items: mockItems }, login: { userLogged: 'admin' } });
    const totalPriceElement = component.find('[className="cart__tablecontainer"] tfoot tr > td').at(0);
    const totalProductsElement = component.find('[className="cart__tablecontainer"] tfoot tr > td').at(1);
    expect(totalPriceElement.text()).toEqual('3');
    expect(totalProductsElement.text()).toEqual('803 €');
  });

  it('lets buy products', () => {
    global.fetch = jest.fn(() => Promise.resolve());
    const component = setup({ cart: { items: mockItems }, login: { userLogged: 'admin' } });
    const spy = jest.spyOn(JSON, 'stringify');
    const buyButtonElement = component.find('[className="btn buy__button"]');
    buyButtonElement.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
