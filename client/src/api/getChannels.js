import GunDB from "../api/gundb";
import { LOG, CLIENT_HOST } from "../api/logremote";
//import { DEBUG } from "../configs/localconfigs";
const DEBUG = true;

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.getChannels initiated : ",
    new Date().toISOString()
  );

const { appState } = GunDB;

export const getChannels = channel => {
  const workChannels = appState.get(channel);
  workChannels.val((value, key) => {
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "1.getChannels channels : ",
        key,
        " -> ",
        value
      );
    return value;
  });
};
