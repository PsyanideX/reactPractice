import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import Cart from './cart';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

configure({ adapter: new Adapter() });

describe('<Cart />', () => {
  const wrapper = shallow(<Cart />);
});
