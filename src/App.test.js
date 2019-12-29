import React from "react";
import { render } from "@testing-library/react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

// Factory function to create ShallowWrapper for the app component.
// @function setup
// @param {object} props - Component props specific for this setup.
// @param {object} state  - initial state for setup
// @returns {ShallowWrapper}

const setUp = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

// Return ShallowWrapper containing node(s) with the given data-test value.
// @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
// @param {string} val -  Value of data-test attribute for search.
// @returns

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

it("renders without crashing", () => {
  const wrapper = setUp();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

it("renders increment button", () => {
  const wrapper = setUp();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

it("renders decrement button", () => {
  const wrapper = setUp();
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  expect(decrementButton.length).toBe(1);
});

it("renders counter display", () => {
  const wrapper = setUp();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

it("renders counter display starts at zero", () => {
  const wrapper = setUp();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

it("renders clicking button increments counter display", () => {
  const counter = 7;
  const wrapper = setUp(null, { counter });

  // Find button and click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");

  // Find counter and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);
});

it("renders clicking decrement button decrements counter display", () => {
  const counter = 15;
  const wrapper = setUp(null, { counter });

  // Find decrementButton and click
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");

  // Find counter and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter - 1);
});

it("renders clicking decrement button while counter display is 0, doesn't display negative value and throw error message", () => {
  const counter = 0;
  const wrapper = setUp(null, counter);

  // Find decrementButton and click
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");

  // Find counter and test value for 0
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(0);

  // Find negativeWarning and check it's value
  const negativeWarning = findByTestAttr(wrapper, "negative-warning");
  expect(negativeWarning.text()).toContain("Can't be a negative number");
});
