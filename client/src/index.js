import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import configureStore from "./store/configureStore";
import registerServiceWorker from "./registerServiceWorker";
import WebFontLoader from "webfontloader";

import { HOSTNAME } from "./configs/localconfigs";
import { DEBUG } from "./configs/localconfigs";
import { LOG, CLIENT_HOST } from "./api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.client index.js intiated : ",
    new Date().toISOString()
  );

WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700", "Material Icons"]
  }
});

const store = configureStore();

const Start = (
  <Router>
    <App />
  </Router>
);

render(
  <Provider store={store}>{Start}</Provider>,
  document.getElementById("root")
);

registerServiceWorker();
