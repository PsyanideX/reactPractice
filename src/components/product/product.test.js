import 'jsdom-global/register';
import React from 'react';
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router, Switch, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import Product from './product';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';
import { apiUrl } from '../../shared/constants/constants';

import { departmentsMock } from '../../testing/mocks/departments.mock';
import { productListMock } from '../../testing/mocks/productList.mock';
import { cartItemsMock } from '../../testing/mocks/cartItems.mock';

const newHistory = createBrowserHistory();
const mockStore = configureStore([]);

configure({ adapter: new Adapter() });

describe('<Product />', () => {
  const setup = (initialState = {}, productId = '') => {
    const match = { params: { productId: productId } };
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <Router history={newHistory}>
          <Product match={match} />
        </Router>
      </Provider>,
    );
    return component;
  };

  it('loads and makes department requests', () => {
    global.fetch.mockResponseOnce(productListMock);
    const component = setup({ cart: { items: cartItemsMock }, login: { userLogged: 'admin' } }, 0);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(component.find('[className="container product__container"]').length).toEqual(1);
  });
});
