import 'jsdom-global/register';
import React from 'react';
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router, Switch, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './home';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';
import { apiUrl } from '../../shared/constants/constants';

import { dealListMock } from '../../testing/mocks/dealList.mock';
import { productListMock } from '../../testing/mocks/productList.mock';
import { departmentsMock } from '../../testing/mocks/departments.mock';

const newHistory = createBrowserHistory();
const mockStore = configureStore([]);

configure({ adapter: new Adapter() });

describe('<Home />', () => {
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

  const setup = (initialState = {}) => {
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <Router history={newHistory}>
          <Home />
        </Router>
      </Provider>,
    );
    return component;
  };

  it('loads and makes requests', () => {
    //global.fetch.mockResponseOnce(productListMock);
    const component = setup({ cart: { items: {} }, login: { userLogged: 'admin' } });
    expect(component.find('.home__deals > .spinner-border').length).toEqual(1);
    expect(component.find('.home__products > .spinner-border').length).toEqual(1);
    expect(fetch).toHaveBeenCalledTimes(3);
  });
});
