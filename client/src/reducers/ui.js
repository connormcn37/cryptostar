import { UNSAVED_CHANGES, SAVED_CHANGES } from "../constants/ActionTypes";
import update from "react-addons-update";

import { DEBUG } from "../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.reducers ui initiated : ",
    new Date().toISOString()
  );

const initialState = {
  unsavedChanges: false
};

export default function uiReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case UNSAVED_CHANGES:
      return setUnsavedChanges(state);
    case SAVED_CHANGES:
      return setSavedChanges(state);
    default:
      return state;
  }
}

function setUnsavedChanges(state) {
  return update(state, {
    unsavedChanges: {
      $set: true
    }
  });
}

function setSavedChanges(state) {
  return update(state, {
    unsavedChanges: {
      $set: false
    }
  });
}
