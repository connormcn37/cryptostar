import { HOSTNAME } from "../configs/localconfigs";

const LOG = console.re;
const CLIENT_HOST =
  window.location && window.location.hostname
    ? window.location.hostname
    : HOSTNAME;

LOG.log(
  "[" + CLIENT_HOST + "]",
  `0.API console.re logging to https://console.re/${HOSTNAME} intiated : `,
  new Date().toISOString()
);

export { LOG, CLIENT_HOST };
