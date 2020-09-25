import 'jsdom-global/register';
import React from 'react';
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router, Switch, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './login';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';
import { apiUrl } from '../../shared/constants/constants';

const newHistory = createBrowserHistory();
const mockStore = configureStore([]);

configure({ adapter: new Adapter() });

describe('<Login />', () => {
  const setup = (initialState = {}) => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={newHistory}>
          <Login />
        </Router>
      </Provider>,
    );
    return wrapper;
  };
  it('loads', () => {
    const wrapper = setup({ cart: { items: {} }, login: { userLogged: '' } });
    expect(wrapper.find('[className="container login"]').length).toEqual(1);
  });

  it('submits login form', () => {
    const wrapper = setup({ cart: { items: {} }, login: { userLogged: '' } });
    const userNameInput = wrapper.find('[name="username"]');
    const passwordInput = wrapper.find('[name="password"]');
    const submitButton = wrapper.find('[type="submit"]');
    userNameInput.simulate('change', { target: { value: 'admin' } });
    passwordInput.simulate('change', { target: { value: 'admin' } });
    submitButton.at(0).simulate('click');
  });
});
