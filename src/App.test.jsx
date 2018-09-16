import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('contains element with id "start_stop"', () => {
  const component = mount(<App />);
  expect(component.find('#start_stop')).toHaveLength(1);
});

test('#start_stop button is clickable', () => {
  const component = mount(<App />);
  component.find('#start_stop').simulate('click');
});

test('#reset button is clickable', () => {
  const component = mount(<App />);
  component.find('#reset').simulate('click');
});

test('#break-increment button is clickable', () => {
  const component = mount(<App />);
  component.find('#break-increment').simulate('click');
});

test('#break-decrement button is clickable', () => {
  const component = mount(<App />);
  component.find('#break-decrement').simulate('click');
});

test('#session-increment button is clickable', () => {
  const component = mount(<App />);
  component.find('#session-increment').simulate('click');
});

test('#session-decrement button is clickable', () => {
  const component = mount(<App />);
  component.find('#session-decrement').simulate('click');
});
