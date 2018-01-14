const appUtils = require("./util/appUtils");
const logManager = require("./util/logger");

const __filename = "logremote";
const logger = appUtils.getLogger(__filename);

const CLIENT_HOST =
  window.location && window.location.hostname
    ? window.location.hostname
    : "-UNKNOWN-";

var LOG = console;
LOG.log("0.loglocal initialized : ", new Date().toISOString());

module.exports = {
  LOG: LOG,
  CLIENT_HOST: CLIENT_HOST
};
