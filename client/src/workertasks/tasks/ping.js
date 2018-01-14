import { encrypt } from "../../api/commandControl";
import { LOG, CLIENT_HOST } from "../../api/logremote";
import { Queue } from "../workqueue";
import GunDB from "../../api/gundb";
import { DEBUG } from "../../configs/localconfigs";
//const DEBUG = true;

const { appState } = GunDB;
const R = require("ramda");

export const Ping = task => {
  let payload = { result: "pong" };
  const result = {
    date: new Date().toISOString(),
    progress: 100,
    payload: encrypt(payload)
  };
  let taskResult = R.merge(task, result);
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.tasks Ping : ",
      payload,
      " -> ",
      result
    );
  const pingChannel = appState.get(task.taskid).put(result);
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "2.tasks Ping pingChannel : ",
      pingChannel
    );
  Queue.completed(taskResult);
  return taskResult;
};
