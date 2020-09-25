import 'jsdom-global/register';
import React from 'react';
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router, Switch, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import Products from './products';
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
  /*beforeEach(() => {
    global.fetch.mockIf(apiUrl, req => {
      if (req.url.endsWith('/departments')) {
        return departmentsMock;
      } else if (req.url.endsWith('/products/?[a-zA-Z0-9_]*')) {
        return productListMock;
      } else if (req.url.endsWith('/deals/?[a-zA-Z0-9_]*')) {
        return dealListMock;
      } else {
        return {
          status: 404,
          body: 'Not Found',
        };
      }
    });
  });*/

  const setup = (initialState = {}, department = '') => {
    const match = { params: { department: department } };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={newHistory}>
          <Products match={match} />
        </Router>
      </Provider>,
    );
    return wrapper;
  };

  it('loads and makes department requests', () => {
    const mockJsonPromise = Promise.resolve(productListMock); // 2
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    //global.fetch.mockResponseOnce(productListMock);
    const wrapper = setup({ cart: { items: cartItemsMock }, login: { userLogged: 'admin' } }, 'Imagen');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(wrapper.find('[className="products__departmentheader"]').length).toEqual(1);
    expect(wrapper.find('[className="products__departmentheader"]').text()).toEqual('Imagen');
    process.nextTick(() => {
      expect(wrapper.find('[className="card"]').length).toEqual(3);

      global.fetch.mockClear();
      done();
    });
  });
});
