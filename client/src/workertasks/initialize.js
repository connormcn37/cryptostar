import UUID from "uuid/v4";
//import '../api/prototypes';
import GunDB from "../api/gundb";
import Cookies from "../api/cookies";
import { LOG, CLIENT_HOST } from "../api/logremote";
import { Fingerprint } from "../api/fingerprint";
import { DEBUG } from "../configs/localconfigs";
//const DEBUG = true;

const { appState } = GunDB;

const { getCookie, setCookie } = Cookies;

const globalChannel = appState.path("globalChannel");
const workChannels = appState.get("workChannels");
const fingerprintChannel = appState.get("fingerprint");

globalChannel.get("channelName").put("globalChannel");
workChannels.get("channelName").put("workChannels");
fingerprintChannel.get("channelName").put("fingerprint");

globalChannel.set(workChannels);

const channelShow = (logID, channelName, channel) => {
  channel.val((value, key) => {
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        `${logID}.initialize channelShow (val) : ${channelName} : `,
        key,
        " -> ",
        value
      );
  });
  channel.map().val((value, key) => {
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        `${logID}.initialize channelShow (map) : ${channelName} : `,
        key,
        " -> ",
        value
      );
  });
};
const getFingerprint = cb => {
  Fingerprint(result => {
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "1.initialize getFingerprint : ",
        result
      );
    const fingerprint = {
      canvas: result.canvas,
      display: result.display,
      fonts: result.fonts,
      fp2: result.fp2,
      mime: result.mime,
      navigator: result.navigator,
      plugins: result.plugins,
      signature: result.signature
    };
    cb(fingerprint);
  });
  return;
};

const createChannel = () => {
  try {
    const newWorkerChannelID = UUID();
    const newChannel = appState.get(newWorkerChannelID);
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "1.initialize create worker Channel : ",
        newWorkerChannelID
      );
    newChannel.get("createDate").put(new Date().toISOString());
    newChannel.get("createDate").val(date => {
      if (DEBUG)
        LOG.log("[" + CLIENT_HOST + "]", "2.initialize createDate : ", date);
    });
    return newWorkerChannelID;
  } catch (e) {}
};

const createWorkerChannels = names => {
  try {
    let newServiceWorkerCookie = {};
    const createDate = new Date().toISOString();
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "1.initialize createWorkerChannels : ",
        names
      );
    // create new workerChannelID
    const workerChannelID = createChannel();
    // create new serviceWorkerChannel
    const serviceWorkerChannel = appState.get(workerChannelID);
    // add channel to globalChannel
    globalChannel.set(serviceWorkerChannel);

    newServiceWorkerCookie.workerChannelID = workerChannelID;
    serviceWorkerChannel.get("channelID").put(workerChannelID);
    serviceWorkerChannel.get("channelName").put("serviceWorker");
    serviceWorkerChannel.get("createDate").put(createDate);
    serviceWorkerChannel.get("createDate").val(date => {
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "2.initialize createWorkerChannels serviceWorkerChannel : ",
          workerChannelID,
          " createDate : ",
          date
        );
    });
    // update last access time
    serviceWorkerChannel.get("lastAccess").put(createDate);
    serviceWorkerChannel.get("lastAccess").val(date => {
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "3.initialize createWorkerChannels serviceWorkerChannel : ",
          workerChannelID,
          " lastAccess : ",
          date
        );
    });
    // update cookie access date
    newServiceWorkerCookie.createDate = createDate;
    newServiceWorkerCookie.lastAccess = createDate;
    // update cookie with channels ID
    for (let serviceWorkerCookieKey of names) {
      let serviceWorkerCookieKeyValue = createChannel();
      // update cookie with appState channel type with workerChannelID
      newServiceWorkerCookie[
        serviceWorkerCookieKey
      ] = serviceWorkerCookieKeyValue;
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "4.initialize createWorkerChannels create New : ",
          serviceWorkerCookieKey,
          " => ",
          serviceWorkerCookieKeyValue
        );
    }
    // save new fingerprint
    getFingerprint(fingerprint => {
      if (!fingerprint) return;
      newServiceWorkerCookie.fingerprint = fingerprint;
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "5.initialize createWorkerChannels fingerprint : ",
          fingerprint
        );
      fingerprintChannel.put(fingerprint);
      channelShow(
        6,
        "createWorkerChannels fingerprintChannel",
        fingerprintChannel
      );

      channelShow(7, "createWorkerChannels globalChannel", globalChannel);

      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "8.initialize createWorkerChannels newServiceWorkerCookie : ",
          newServiceWorkerCookie
        );
      // save new cookie
      setCookie("serviceworker", newServiceWorkerCookie);
      workChannels.put(newServiceWorkerCookie);
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "9.initialize startChannels saved Cookie : ",
          getCookie("serviceworker")
        );
      return newServiceWorkerCookie;
    });
  } catch (e) {}
};

const clearServiceWorkerCookies = () => {
  setCookie("serviceworker", {});
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.initialize clearServiceWorkerCookies : ",
      new Date().toISOString()
    );
};
export const startChannels = names => {
  //    clearServiceWorkerCookies();
  try {
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "1.initialize startChannels names : ",
        names
      );
    const lastAccess = new Date().toISOString();
    let serviceWorkerCookie = getCookie("serviceworker");
    if (!DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "2.initialize startChannels FOUND serviceWorkerCookie : ",
        serviceWorkerCookie
      );
    // FOUND : previously saved serviceWorker cookie
    if (serviceWorkerCookie && serviceWorkerCookie.workerChannelID) {
      getFingerprint(fingerprint => {
        if (!fingerprint) return;
        // DON'T put current fingerprint into cookie
        //        serviceWorkerCookie.fingerprintCurrent = fingerprint;
        if (DEBUG)
          LOG.log(
            "[" + CLIENT_HOST + "]",
            "3.initialize startChannels fingerprintCurrent : ",
            fingerprint
          );
        // connect to previous workerChannel
        const serviceWorkerChannel = appState.get(
          serviceWorkerCookie.workerChannelID
        );
        channelShow(
          4,
          "startChannels retrieved serviceWorkerChannel",
          serviceWorkerChannel
        );

        fingerprintChannel.put(fingerprint);
        channelShow(
          5,
          "startChannels fingerprintChannel fingerprint",
          fingerprintChannel
        );

        globalChannel.set(serviceWorkerChannel);
        channelShow(6, "startChannels globalChannel", globalChannel);

        serviceWorkerChannel.get("lastAccess").put(lastAccess);
        serviceWorkerChannel.get("lastAccess").val(date => {
          if (DEBUG)
            LOG.log(
              "[" + CLIENT_HOST + "]",
              "8.initialize startChannels workerChannelID : ",
              serviceWorkerCookie.workerChannelID,
              " lastAccess : ",
              date
            );
        });
        serviceWorkerCookie.lastAccess = lastAccess;
        workChannels.put(serviceWorkerCookie);
        // maybe put signature here
        setCookie("serviceworker", serviceWorkerCookie);
        channelShow(7, "startChannels globalChannel", globalChannel);

        if (DEBUG)
          LOG.log(
            "[" + CLIENT_HOST + "]",
            "10.initialize startChannels serviceWorkerCookie : ",
            getCookie("serviceworker")
          );
      });
    } else {
      // NOT FOUND : previously saved serviceWorker cookie
      const newWorkChannels = createWorkerChannels(names);
      if (!DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "11.initialize startChannels NOT FOUND channels cookie : ",
          newWorkChannels
        );
      if (!newWorkChannels) return null;
      workChannels.put(newWorkChannels);
      channelShow(12, "startChannels globalChannel", globalChannel);
    }
    return "workChannels";
  } catch (e) {}
};
