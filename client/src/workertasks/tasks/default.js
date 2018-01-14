import { encrypt, decrypt } from "../../api/commandControl";
import { LOG, CLIENT_HOST } from "../../api/logremote";
import { Queue } from "../workqueue";
import { DEBUG } from "../../configs/localconfigs";
//const DEBUG = true;

const R = require("ramda");

export const Default = task => {
  let payload = { result: "error : task unsupported" };
  const result = {
    date: new Date().toISOString(),
    progress: 100,
    payload: encrypt(payload)
  };
  let taskResult = R.merge(task, result);
  if (DEBUG)
    LOG.error("[" + CLIENT_HOST + "]", "1.tasks Default error : ", payload);
  Queue.completed(taskResult);
  return taskResult;
};
