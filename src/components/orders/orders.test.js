import 'jsdom-global/register';
import React from 'react';
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router, Switch, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import Orders from './orders';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';
import { apiUrl } from '../../shared/constants/constants';

import { ordersMock } from '../../testing/mocks/orders.mock';
import { productListMock } from '../../testing/mocks/productList.mock';
import { cartItemsMock } from '../../testing/mocks/cartItems.mock';

const newHistory = createBrowserHistory();
const mockStore = configureStore([]);

configure({ adapter: new Adapter() });

describe('<Orders />', () => {
  global.fetch = jest.fn(() => Promise.resolve(Promise.resolve(ordersMock)));
  const setup = (initialState = {}, productId = '') => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={newHistory}>
          <Orders />
        </Router>
      </Provider>,
    );
    return wrapper;
  };
  beforeEach(() => {
    fetch.mockClear();
  });
  it('loads and makes department requests', () => {
    const wrapper = setup({ cart: { items: cartItemsMock }, login: { userLogged: 'admin' } });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(wrapper.find('[className="container"]').length).toEqual(1);
  });
});
