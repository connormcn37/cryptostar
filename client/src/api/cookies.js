//import md5 from "blueimp-md5";
//import cookies from "js-cookie";
import { storageGetItem, storageSetItem } from "./storage";
//import { encrypt, decrypt } from "./commandControl";
import { LOG, CLIENT_HOST } from "../api/logremote";
import { DEBUG } from "../configs/localconfigs";
//const DEBUG=true;

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.cookies initiated : ",
    new Date().toISOString()
  );

const R = require("ramda");
//const encrypt = value => value;
//const decrypt = value => value;
//storageTest('date', new Date().toISOString());

const getEncryptedCookie = cookieName => {
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.cookies getEncryptedCookie : ",
      cookieName
    );
  return storageGetItem(cookieName);
  //  return cookies.get(cookieName);
};

const getCookie = cookieName => {
  //  const encryptedValue = getEncryptedCookie(cookieName);
  const value = storageGetItem(cookieName);

  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.cookies getCookie : ",
      value,
      " -> ",
      value.toString().length ? value.toString().length : null
    );
  //  const cookieValue = encryptedValue && encryptedValue.length? decrypt(encryptedValue) : null;
  const cookieValue = value && value.toString().length ? value : null;
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "2.cookies getCookie decrypted : ",
      cookieName,
      "->",
      cookieValue
    );
  return cookieValue;
};

const writeCookie = (key, value) => {
  //  const encryptedValue = encrypt(value);

  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.cookies writeCookie : ",
      key,
      "->",
      value,
      "->",
      value && value.toString().length ? value.toString().length : null
    );
  return storageSetItem(key, value);
  //  return cookies.set(key, encryptedValue);
};

const setCookie = (cookieName, value) => {
  const setCookieResult = writeCookie(cookieName, value);
  const cookieValue = getCookie(cookieName);
  if (R.equals(value, cookieValue)) {
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "1.cookie setCookie SUCCESS",
        cookieName
      );
    return true;
  } else {
    if (DEBUG)
      LOG.error(
        "[" + CLIENT_HOST + "]",
        "2.cookie setCookie FAILED",
        cookieName
      );
    return false;
  }
};

const testCookie = value => {
  const key = "TEST_COOKIE";
  const setCookieResult = writeCookie(key, value);
  const cookieValue = getCookie(key);
  if (R.equals(value, cookieValue)) {
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "1.cookie testCookie SUCCESS : ",
        " Value : ",
        value,
        " validate : ",
        cookieValue
      );
    return true;
  } else {
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "2.cookie testCookie FAILED : ",
        " value : ",
        value,
        " validate : ",
        cookieValue
      );
    return false;
  }
  return null;
};

//if (DEBUG) testCookie({date: new Date().toISOString()});

export default { getCookie, setCookie };
