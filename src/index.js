import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Mural from "./components/Mural";
import store from "./store";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "font-awesome/css/font-awesome.css";

if (process.env.NODE_ENV !== "production") {
  const axe = require("@axe-core/react");
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(
  <Provider store={store}>
    <Mural />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
