import React from 'react';
import ReactDOM from 'react-dom';
import {
  configure, shallow, mount, render,
} from 'enzyme';

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
