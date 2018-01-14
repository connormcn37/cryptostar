import { call, put } from "redux-saga/effects";
import { serverLoad } from "../actions";
import * as PersistenceEngine from "./persistence/engine";
import { DEBUG } from "../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.Sagas load intitiated : ",
    new Date().toISOString()
  );

export default function* loadSaga() {
  yield put(serverLoad.request());
  const state = yield call(PersistenceEngine.load);
  yield put(serverLoad.success(state));
}
