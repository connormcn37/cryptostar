import { fork, all } from "redux-saga/effects";

import load from "./load";
import persistence from "./persistence";
import { DEBUG } from "../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.saga initiated : ",
    new Date().toISOString()
  );

export default function* root() {
  yield all([fork(load), fork(persistence)]);
}
