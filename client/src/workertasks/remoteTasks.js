import GunDB from "../api/gundb";
import { encrypt, decrypt } from "../api/commandControl";
import { LOG, CLIENT_HOST } from "../api/logremote";
import { DEBUG } from "../configs/localconfigs";

//const DEBUG = true;

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.remoteTasks initiated : ",
    new Date().toISOString()
  );

export const processRemoteTasks = task => {
  console.log("1.processRemoteTasks : ", task);
  return task;
};
