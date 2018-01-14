import * as types from "../../constants/ActionTypes";
import { DEBUG } from "../../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.sagas persistence whitelist initiated : ",
    new Date().toISOString()
  );

export const PersistenceType = {
  IMMEDIATE: "IMMEDIATE",
  DEBOUNCE: "DEBOUNCE"
};

const Whitelist = {
  [types.CREATE_IMAGE]: PersistenceType.IMMEDIATE,
  [types.CLEAR_VIEWPORT]: PersistenceType.IMMEDIATE,
  [types.MOVE_IMAGE]: PersistenceType.DEBOUNCE
};

export function getPersistenceType(type) {
  return Whitelist[type] || null;
}
