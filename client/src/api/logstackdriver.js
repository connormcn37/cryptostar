//import StackTrace from 'stacktrace-js';
import StackdriverErrorReporter from "./stackdriver-errors.js";
import { HOSTNAME } from "../configs/localconfigs";
// import { ERROR_KEY } from "../configs/secrets";

const ERROR_KEY = process.env.ERROR_KEY
  ? process.env.ERROR_KEY
  : {
      key: "KKKKKKKK",
      projectId: "memory02"
    };

const CLIENT_HOST =
  window.location && window.location.hostname
    ? window.location.hostname
    : HOSTNAME;

let ERROR;

ERROR = new StackdriverErrorReporter();
ERROR.start(ERROR_KEY);

ERROR.report(
  "[" + CLIENT_HOST + "]",
  `0.API StackdriverErrorReporter intiated : `,
  new Date().toISOString()
);

export { ERROR };
