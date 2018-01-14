// simple save/load from the localStorage
// a Promise wouldn't even be needed, but this way it shows how it can easily
// be adapted for asynchronous IO (ie: AJAX requests to the server)
//import { cookie } from 'redux-effects-universal-cookie';
//import Onboarding from '../../api/onboarding';

import Cookies from "../../api/cookies";
import { HOSTNAME } from "../../configs/localconfigs";
import { DEBUG_KEY } from "../../configs/secrets";
import { DEBUG } from "../../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.sagas persistence engine initiated : ",
    new Date().toISOString()
  );

const R = require("ramda");
const Lokka = require("lokka").Lokka;
const Transport = require("lokka-transport-http").Transport;
const client = new Lokka({
  transport: new Transport(`https://${HOSTNAME}/api/graphql/`)
});

const STORAGE_KEY = "persistence";
const ACCOUNT_KEY = "accountkey";

export const save = newState => {
  const { setCookie } = Cookies;
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.sagas persistence engine save state ",
      newState
    );
  //  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  setCookie(STORAGE_KEY, newState);
  return Promise.resolve(newState);
};

export const load = (key = STORAGE_KEY) => {
  const { getCookie } = Cookies;
  //  const state = window.localStorage.getItem(STORAGE_KEY);
  const value = getCookie(key);
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.sagas persistence engine load ",
      key,
      " -> ",
      value
    );
  return value ? value : undefined;
};

////////

const saveKey = (key, value) => {
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.sagas persistence engine saveKey to cookie ",
      key,
      " -> ",
      value
    );
  const { setCookie } = Cookies;

  setCookie(key, value);
  return value ? value : undefined;
};

const loadKey = (key = ACCOUNT_KEY) => {
  const { getCookie } = Cookies;
  const value = getCookie(key);
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.sagas persistence engine loadKey from cookie ",
      key,
      " -> ",
      value
    );
  return value ? value : undefined;
};

const getKey = keyOptions => {
  const accountKey = loadKey(ACCOUNT_KEY);
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.sagas persistence engine getKey from cookie : ",
      accountKey
    );
  if (accountKey && !R.equals(accountKey, DEBUG_KEY)) return accountKey;

  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "2.sagas persistence engine getKey cookie from Backend"
    );
  // client is NOT served by ME send DEBUG_KEY
  if (CLIENT_HOST !== HOSTNAME) {
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "3.sagas persistence engine getKey from STUBBED backend DEBUG_KEY : ",
        DEBUG_KEY
      );
    saveKey(ACCOUNT_KEY, DEBUG_KEY);
    return DEBUG_KEY;
  }
  // Asking backend Graphql endpoint for key
  client
    .query(
      `query($id: Int!, $accesskey: String!){
      key(id: $id, accesskey: $accesskey ) {
        key
      }
    }`,
      keyOptions
    )
    .then(result => {
      saveKey(ACCOUNT_KEY, result.key.key);
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "4.sagas persistence engine getKey from GraphQL backend KEY : ",
          result.key.key
        );
      return result.key.key;
    });
};

// Test get onboarding key
const keysVars = {
  id: 1,
  accesskey: "AAAAAAAA"
};

getKey(keysVars);
