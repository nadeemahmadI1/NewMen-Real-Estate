import React from "react";
import ReactDOM from "react-dom"; // Import ReactDOM from 'react-dom'
import App from "./App.jsx";
import "./index.css";
import store from "./redux/Store.js";
import { Provider } from "react-redux";

ReactDOM.render(
  // Use ReactDOM.render for normal rendering
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
