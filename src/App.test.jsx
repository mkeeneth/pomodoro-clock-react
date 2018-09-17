import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import {
  Footer, Controls, Session, BreakControl, SessionControl,
} from './App';

configure({ adapter: new Adapter() });

jest.useFakeTimers();

// ==== deep rendering tests ====
test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('contains element with id "start_stop"', () => {
  const component = mount(<App />);
  expect(component.find('#start_stop')).toHaveLength(1);
});

test('#start_stop button is clickable and timer counts down', () => {
  const component = mount(<App />);
  const startTime = component.state().time;
  component.find('#start_stop').simulate('click');
  jest.runOnlyPendingTimers(); // fast forward
  expect(component.state().time).toBeLessThan(startTime); // make sure the time counting down
});

test('#reset button is clickable and resets state', () => {
  const defaultState = {
    breakTimeLength: 5,
    sessionTimeLength: 25,
    time: 25 * 60, // seconds
    running: false,
    paused: false,
    displayTitle: 'Session',
  };
  const component = mount(<App />);
  component.find('#break-increment').simulate('click'); // change values
  component.find('#session-increment').simulate('click'); // change values
  component.find('#start_stop').simulate('click'); // start
  component.find('#reset').simulate('click'); // make sure it reset
  expect(component.state()).toEqual(defaultState);
});

test('#break-increment button is clickable', () => {
  const component = mount(<App />);
  const currentBreakTimeLength = component.state().breakTimeLength;
  component.find('#break-increment').simulate('click');
  expect(component.state().breakTimeLength).toBeGreaterThan(currentBreakTimeLength);
});

test('#break-decrement button is clickable', () => {
  const component = mount(<App />);
  const currentBreakTimeLength = component.state().breakTimeLength;
  component.find('#break-decrement').simulate('click');
  expect(component.state().breakTimeLength).toBeLessThan(currentBreakTimeLength);
});

test('#session-increment button is clickable', () => {
  const component = mount(<App />);
  const currentSessionTimeLength = component.state().sessionTimeLength;
  component.find('#session-increment').simulate('click');
  expect(component.state().sessionTimeLength).toBeGreaterThan(currentSessionTimeLength);
});

test('#session-decrement button is clickable', () => {
  const component = mount(<App />);
  const currentSessionTimeLength = component.state().sessionTimeLength;
  component.find('#session-decrement').simulate('click');
  expect(component.state().sessionTimeLength).toBeLessThan(currentSessionTimeLength);
});

// ==== snapshot tests ===
test('footer components renders properly', () => {
  const component = renderer.create(<Footer />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Controls components renders properly', () => {
  const component = renderer.create(<Controls />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Session components renders properly', () => {
  const component = renderer.create(<Session />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('BreakControl components renders properly', () => {
  const component = renderer.create(<BreakControl />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('SessionControl components renders properly', () => {
  const component = renderer.create(<SessionControl />);
  expect(component.toJSON()).toMatchSnapshot();
});
