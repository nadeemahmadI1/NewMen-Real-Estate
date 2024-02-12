import React from "react";
import ReactDOM from "react-dom"; // Import ReactDOM from 'react-dom'
import App from "./App.jsx";
import "./index.css";
import store, { persistor } from "./redux/Store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  // Use ReactDOM.render for normal rendering
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
