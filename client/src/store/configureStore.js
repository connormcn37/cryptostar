import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import cookieMiddleware from "redux-effects-universal-cookie";

import rootReducer from "../reducers";
import sagas from "../sagas";

import { LOG, CLIENT_HOST } from "../api/logremote";
import { DEBUG } from "../configs/localconfigs";
if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.store configureStore initiated : ",
    new Date().toISOString()
  );

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware(sagas);
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, cookieMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  sagaMiddleware.run(sagas);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
