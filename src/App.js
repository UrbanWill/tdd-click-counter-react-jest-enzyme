import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      negativeWarning: ""
    };

    this.handleDecrementButton = this.handleDecrementButton.bind(this);
    this.handleIncrementButton = this.handleIncrementButton.bind(this);
  }

  handleDecrementButton() {
    if (this.state.counter === 0) {
      this.setState({ negativeWarning: "Can't be a negative number" });
    } else {
      this.setState({ counter: this.state.counter - 1 });
    }
  }

  handleIncrementButton() {
    // if (this.state.negativeWarning !== "")
    //   this.setState({ negativeWarning: "" });

    this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          The current count is {this.state.counter}
        </h1>
        <h3 data-test="negative-warning" style={{ color: "red" }}>
          {this.state.negativeWarning}
        </h3>
        <button
          data-test="increment-button"
          onClick={() => this.handleIncrementButton()}
        >
          Increment
        </button>
        <button
          data-test="decrement-button"
          onClick={() => this.handleDecrementButton()}
        >
          Decrement
        </button>
      </div>
    );
  }
}

export default App;
