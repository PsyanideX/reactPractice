import 'jsdom-global/register';
import React from 'react';
import { configure } from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router, Switch, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import Searchbar from './searchbar';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';

import { cartItemsMock } from '../../testing/mocks/cartItems.mock';

const newHistory = createBrowserHistory();
const mockStore = configureStore([]);

configure({ adapter: new Adapter() });

describe('<Searchbar />', () => {
  global.fetch = jest.fn(() => Promise.resolve());
  const setup = (initialState = {}) => {
    const store = mockStore(initialState);
    const component = mount(
      <Provider store={store}>
        <Router history={newHistory}>
          <Searchbar />
        </Router>
      </Provider>,
    );
    return component;
  };

  it('loads and makes requests', () => {
    const component = setup({ cart: { items: cartItemsMock }, login: { userLogged: 'admin' } });
    expect(component.find('[className="form-group row search"]').length).toEqual(1);
    expect(fetch).toHaveBeenCalledTimes(1);
    component.unmount();
  });
});
