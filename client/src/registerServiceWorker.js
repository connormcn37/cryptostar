// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

import { LOG, CLIENT_HOST } from "./api/logremote";
import { ERROR } from "./api/logstackdriver";
import { startChannels, Queue } from "./workertasks/index";
import GunDB from "./api/gundb";
import { decrypt } from "./api/commandControl";
import { DEBUG } from "./configs/localconfigs";

//const DEBUG = true;

const { appState } = GunDB;
if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.serviceWorker initiated : ",
    new Date().toISOString()
  );

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.serviceWorker register : ",
      new Date().toISOString()
    );
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "2.serviceWorker register publicUrl : ",
        publicUrl
      );
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "3.serviceWorker register publicUrl different domain error! ",
          publicUrl.origin,
          " !== ",
          window.location.origin
        );
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "4.serviceWorker register addEventListener(load) : ",
          swUrl
        );
      if (!isLocalhost) {
        // Is not local host. Just register service worker
        if (DEBUG)
          LOG.log(
            "[" + CLIENT_HOST + "]",
            "4.serviceWorker register addEventListener(load) NOT localhost "
          );
        registerValidSW(swUrl);
      } else {
        // This is running on localhost. Lets check if a service worker still exists or not.
        if (DEBUG)
          LOG.log(
            "[" + CLIENT_HOST + "]",
            "5.serviceWorker register addEventListener(load) ON localhost "
          );
        checkValidServiceWorker(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.serviceWorker registerValidSW : ",
      new Date().toISOString()
    );
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              if (DEBUG)
                LOG.log(
                  "[" + CLIENT_HOST + "]",
                  "New content is available; please refresh."
                );
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              if (DEBUG)
                LOG.log(
                  "[" + CLIENT_HOST + "]",
                  "Content is cached for offline use."
                );
            }
          }
        };
      };
    })
    .catch(error => {
      ERROR.report(
        "[" + CLIENT_HOST + "]",
        "Error during service worker registration:",
        error
      );
    });
}
function checkValidServiceWorker(swUrl) {
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.serviceWorker checkValidServiceWorker : ",
      new Date().toISOString()
    );
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get("content-type").indexOf("javascript") === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        if (DEBUG)
          LOG.log(
            "[" + CLIENT_HOST + "]",
            "2.serviceWorker checkValidServiceWorker : No service worker found : Reloading page ... "
          );
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        if (DEBUG)
          LOG.log(
            "[" + CLIENT_HOST + "]",
            "3.serviceWorker checkValidServiceWorker : VALID worker : "
          );
        registerValidSW(swUrl);
      }
    })
    .catch(e => {
      if (DEBUG)
        console.error(
          "[" + CLIENT_HOST + "]",
          "No internet connection found. App is running in offline mode.",
          e
        );
    });
}

export function unregister() {
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "1.serviceWorker unregister : ",
      new Date().toISOString()
    );
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

// create new channels
const channelNames = ["workQueue", "messageChannel"];
const channels = startChannels(channelNames); //-> 'workChannels'
if (DEBUG)
  LOG.log("[" + CLIENT_HOST + "]", "1.serviceWorker channels : ", channels);
appState.get(channels).val(value => {
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "2.serviceWorker channels result : ",
      value
    );
  appState
    .get(channels)
    .get("fingerprint")
    .val(fingerprint => {
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "3.serviceWorker channels fingerprint : ",
          fingerprint
        );
    });
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      //do something with value;
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "4.serviceWorker channels result : ",
          key,
          value[key]
        );
    }
  }
});

const queue = "AAAAA";
let taskID = Queue.add({ queue: queue, tasktype: "ping" });
if (DEBUG)
  LOG.log("[" + CLIENT_HOST + "]", "4.serviceWorker Queue taskID : ", taskID);

appState.get(taskID).val((value, key) => {
  if (DEBUG)
    LOG.log(
      "[" + CLIENT_HOST + "]",
      "5.serviceWorker Queue result : ",
      key,
      " -> ",
      decrypt(value.payload).result
    );
});

if (DEBUG) {
  ERROR.setUser(taskID);
  ERROR.report("ERROR-ERROR-ERROR : ", new Date().toISOString());
}
