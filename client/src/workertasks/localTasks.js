import GunDB from "../api/gundb";
import { encrypt, decrypt } from "../api/commandControl";
import { LOG, CLIENT_HOST } from "../api/logremote";
import { Ping, Default, clearStorage } from "./tasks/index";
import { DEBUG } from "../configs/localconfigs";
//const DEBUG = true;

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.localTasks initiated : ",
    new Date().toISOString()
  );
const { appState } = GunDB;
const executeTask = task => {
  const taskChannel = task.taskChannel;
  let payload;
  if (DEBUG)
    LOG.log("[" + CLIENT_HOST + "]", "1.localTasks executeTask : ", task);
  switch (task.tasktype) {
    case "ping":
      payload = Ping(task);
      break;
    case "clearStorage":
      payload = clearStorage(task);
      break;
    default:
      payload = Default(task);
      break;
  }
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "2.localTasks executeTask result : ",
      payload
    );
  return payload;
};

export const processLocalTasks = task => {
  if (DEBUG)
    LOG.log("[" + CLIENT_HOST + "]", "1.localTasks processLocalTasks : ", task);
  return executeTask(task);
};
