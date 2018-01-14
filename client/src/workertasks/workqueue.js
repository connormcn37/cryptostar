import UUID from "uuid/v4";
import { decrypt } from "../api/commandControl";
import { LOG, CLIENT_HOST } from "../api/logremote";
import GunDB from "../api/gundb";
import { addTask } from "./taskMaster";
import { DEBUG } from "../configs/localconfigs";
//const DEBUG = true;

const R = require("ramda");
const { appState } = GunDB;

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.workqueue initiated : ",
    new Date().toISOString()
  );
let taskList = [];

const addQueue = task => {
  if (DEBUG) LOG.log("[" + CLIENT_HOST + "]", "1.workqueue addQueue : ", task);
  const taskid = UUID();
  task.taskid = taskid;
  //  saveTaskID
  taskList.push(taskid);
  const queueID = addTask(task);
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "2.workqueue addQueue verified : ",
      queueID === taskid
    );
  return taskid;
};
const taskCompleted = task => {
  if (DEBUG)
    LOG.log("[" + CLIENT_HOST + "]", "1.workqueue taskCompleted : ", task);
  const taskSignature = R.clone(task);
  taskSignature.payload = decrypt(task.payload);
  const taskChannel = task.taskChannel;
  taskChannel.put(taskSignature.payload);
  taskChannel.get(taskSignature.taskid).val((value, key) => {
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "2.workqueue taskCompleted taskChannel : ",
        key,
        " -> ",
        value
      );
  });
  return taskSignature.taskid;
};
export const Queue = {
  add: addQueue,
  completed: taskCompleted
};
