import queue from "shuffled-priority-queue";
import serialize from "serialize-javascript";
import UUID from "uuid/v4";
import GunDB from "../api/gundb";
import { encrypt, decrypt } from "../api/commandControl";
import { processLocalTasks } from "./localTasks";
import { processRemoteTasks } from "./remoteTasks";
import { LOG, CLIENT_HOST } from "../api/logremote";
import { DEBUG } from "../configs/localconfigs";
//const DEBUG = true;

const deserialize = serializedJavascript => {
  return eval("(" + serializedJavascript + ")");
};
const { appState } = GunDB;

const taskQueue = queue();
//var tasks = [];
var timer = null;

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const sendWork = newTask => {
  if (newTask.value && newTask.value.taskid) {
    //    tasks.push(newTask.value.taskid);
    const task = newTask.value;
    if (DEBUG)
      LOG.log("[" + CLIENT_HOST + "]", "1.taskMaster sendWork : ", newTask);
    switch (task.workertype) {
      case "local":
        if (DEBUG)
          LOG.log(
            "[" + CLIENT_HOST + "]",
            "2.taskMaster sendWork local : ",
            task
          );
        processLocalTasks(task);
        break;
      case "remote":
        if (DEBUG)
          LOG.log(
            "[" + CLIENT_HOST + "]",
            "3.taskMaster sendWork remote : ",
            task
          );
        processRemoteTasks(task);
        break;
      default:
        if (DEBUG)
          LOG.error(
            "[" + CLIENT_HOST + "]",
            "4.taskMaster sendWork unknown worker type (local or remote) : ",
            newTask
          );
        break;
    }
    return newTask.value.taskid;
  }
  return null;
};
const processTask = () => {
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.taskMaster processTask : ",
      new Date().toISOString()
    );
  const currentTask = taskQueue.pop();
  if (!currentTask) {
    clearInterval(timer);
    timer = null;
    return null;
  }
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "2.taskMaster processTask : ",
      currentTask
    );
  sendWork(currentTask);
  processTask();
};
export const addTask = task => {
  if (DEBUG)
    LOG.log("[" + CLIENT_HOST + "]", "1.taskMaster addQueue input : ", task);
  const taskid = task.taskid; // ? task.taskid : UUID();
  const taskChannel = appState.get(taskid);
  let r = randomNumber(100, 500);
  let taskPriority = { urgent: 2000, high: 1000, medium: 500, low: 100, r: r };
  let action = () => {
    let date = new Date().toISOString();
    console.log("[" + CLIENT_HOST + "]", "1.worker action : ", date);
    return "Action : " + date;
  };
  let tasktype;
  // possible values are local, remote  and is default to local
  let workertype = task.workerType ? task.workerType : "local";
  let payload = new Date().toISOString();
  let priority = task.priority ? task.priority : taskPriority.r;

  switch (task.tasktype) {
    case "action":
      tasktype = "action";
      payload = serialize(action);
      break;
    case "clearStorage":
      tasktype = "clearStorage";
      priority = taskPriority.urgent;
      break;
    case "ping":
      tasktype = "ping";
      break;
    case "fingerprint":
      tasktype = "fingerprint";
      priority = taskPriority.high;
      break;
    default:
      tasktype = "ping";
      priority = taskPriority.low;
      break;
  }
  const newTask = {
    priority: priority,
    value: {
      queue: task.queue,
      workertype: workertype,
      tasktype: tasktype,
      taskid: taskid,
      taskChannel: taskChannel,
      payload: encrypt(payload)
    }
  };
  taskQueue.add(newTask);
  if (DEBUG)
    LOG.log("[" + CLIENT_HOST + "]", "2.taskMaster addQueue Added : ", newTask);
  if (timer === null) {
    timer = setInterval(processTask, 100);
  }
  return taskid;
};
