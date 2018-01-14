import * as types from "../constants/ActionTypes";

import { DEBUG } from "../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.api actions initiated : ",
    new Date().toISOString()
  );

export function createImage(img) {
  return {
    type: types.CREATE_IMAGE,
    payload: img
  };
}

export function moveImage(img) {
  return {
    type: types.MOVE_IMAGE,
    payload: img
  };
}

export function clearViewport() {
  return {
    type: types.CLEAR_VIEWPORT
  };
}

export function signalUnsavedChanges() {
  return {
    type: types.UNSAVED_CHANGES
  };
}

export function signalSavedChanges() {
  return {
    type: types.SAVED_CHANGES
  };
}

export const serverSave = {
  request: state => {
    return { type: types.SERVER_SAVE_REQUEST, payload: state };
  },
  success: () => {
    return { type: types.SERVER_SAVE_SUCCESS };
  },
  failure: () => {
    return { type: types.SERVER_SAVE_FAILURE };
  }
};

export const serverLoad = {
  request: () => {
    return { type: types.SERVER_LOAD_REQUEST };
  },
  success: state => {
    return { type: types.SERVER_LOAD_SUCCESS, payload: state };
  },
  failure: () => {
    return { type: types.SERVER_LOAD_FAILURE };
  }
};
