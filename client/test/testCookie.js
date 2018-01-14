import Cookies from "../src/api/cookies";

if (DEBUG) {
  const VERIFY_KEY = "VERIFY_KEY";
  const STORAGE_KEY = "persistence";
  const { getCookie, testCookie, setCookie } = Cookies;
  const oldVerifyCookie = getCookie(VERIFY_KEY);
  const testResult = testCookie(new Date().toISOString());
  const newCookie = setCookie(VERIFY_KEY, "COOKIE_ENABLED");
  const verifyCookie = getCookie(VERIFY_KEY);
  const lastStorage = getCookie(STORAGE_KEY);

  LOG.log(
    "[" + CLIENT_HOST + "]",
    "1.index.js previously enabled Cookie : ",
    oldVerifyCookie
  );
  LOG.log("[" + CLIENT_HOST + "]", "2.index.js testCookie : ", testResult);
  LOG.log("[" + CLIENT_HOST + "]", "2.index.js VERIFY_COOKIE : ", verifyCookie);
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "3.index.js last persistence cookie : ",
    lastStorage
  );
}
