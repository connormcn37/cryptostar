import { combineReducers } from "redux";
import viewport from "./viewport";
import ui from "./ui";

import { DEBUG } from "../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.reducers index.js initiated : ",
    new Date().toISOString()
  );

const rootReducer = combineReducers({
  viewport,
  ui
});

export default rootReducer;
