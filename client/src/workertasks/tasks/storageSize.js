import { encrypt, decrypt } from "../../api/commandControl";
import { LOG, CLIENT_HOST } from "../../api/logremote";
import { Queue } from "../workqueue";
//import { DEBUG } from "../../configs/localconfigs";
const DEBUG = true;

const R = require("ramda");

export const getLocalstorageSize = () => {
  // fill up all data in local storage to see how much we can squeeze in
  const maxMBToTest = 200;
  localStorage.clear();
  let i = 0,
    storeSpace = 0;
  let testPacket = new Array(1025).join("a"); // create 1024 characters so 1KB
  while (i < maxMBToTest) {
    // MB level
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "1.storageSize getStorageSize verify : " + i + "Mb"
      );
    let t = 0;
    while (t < 1025) {
      // KB level
      try {
        localStorage.setItem(i + "|" + t, testPacket);
      } catch (error) {
        let kbsaved = Math.floor(t / 1024 * 100); // calculate percentage of 1024
        storeSpace = i + "." + kbsaved; // add MB and KB values
        storeSpace = Math.floor(storeSpace * 100) / 100; // rounds down the value
        t = 1025;
        i = maxMBToTest + 1;
      }
      t++;
    }
    i++;
  }
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.StorageSize Space Available = " + storeSpace + "Mb"
    );
  localStorage.clear(); // clear all local storage
  localStorage.setItem("storeSpace", storeSpace); // store this value
  return storeSpace;
};

export const clearStorage = task => {
  let payload = { localstorage: getLocalstorageSize() };
  //  let payload = { localstorage: 10000 };
  const result = {
    date: new Date().toISOString(),
    progress: 100,
    payload: encrypt(payload)
  };
  let taskResult = R.merge(task, result);
  if (DEBUG)
    LOG.log("[" + CLIENT_HOST + "]", "1.tasks clearStorage : ", payload);
  Queue.completed(taskResult);
  return taskResult;
};
