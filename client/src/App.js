import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
//import UUID from 'uuid/v1';
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import NavLink from "./NavLink";

import Home from "./containers/Home";
import Page1 from "./containers/Page1";
import Page2 from "./containers/Page2";
import Page3 from "./containers/Page3";
import PageEditor from "./containers/PageEditor";
import PageDeveloper from "./containers/PageDeveloper";
import { HOSTNAME } from "./configs/localconfigs";
import { LOG, CLIENT_HOST } from "./api/logremote";
import { DEBUG_KEY } from "./configs/secrets";
import Cookies from "./api/cookies";
import GunDB from "./api/gundb";

//import { DEBUG } from "./configs/localconfigs";
const DEBUG = true;

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.App.js initiated : ",
    new Date().toISOString()
  );

const navItems = [
  {
    exact: true,
    label: "Home",
    to: "/",
    icon: "home"
  },
  {
    label: "Page 1",
    to: "/page-1",
    icon: "bookmark"
  },
  {
    label: "Page 2",
    to: "/page-2",
    icon: "donut_large"
  },
  {
    label: "Page 3",
    to: "/page-3",
    icon: "flight_land"
  },
  {
    label: "Editor",
    to: "/page-editor",
    icon: "donut_large"
  },
  {
    label: "Developer",
    to: "/page-developer",
    icon: "donut_large"
  }
];

const { appState } = GunDB;
const { getCookie, setCookie } = Cookies;

const Welcome = () => <p>Welcome ... </p>;
const ACCOUNT_KEY = "accountkey";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workerOnline: false,
      workerConnectionID: "Connecting to worker ...",
      workerQueueID: "Accessing work queue ...",
      workerMessageID: "Connecting messages ...",
      fingerprintCurrent: "",
      fingerprintInitial: "",
      lastAccess: "",
      createDate: "",
      drawerTitle: "live learn grow"
    };
  }
  componentWillMount() {
    if (DEBUG) LOG.log("[" + CLIENT_HOST + "]", "1.App props : ", this.props);
    this.connectWorker();
  }

  connectWorker = () => {
    const oldCookie = getCookie("serviceworker");
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "1.App connectWorker =====> : ",
        oldCookie
      );
    if (oldCookie && oldCookie.fingerprint)
      this.setState({ fingerprintInitial: oldCookie.fingerprint });
    if (this.state.workerOnline) return;

    const workChannels = appState.get("workChannels");
    if (!workChannels) return;

    if (DEBUG)
      LOG.log("[" + CLIENT_HOST + "]", "2.App connectWorker : ", workChannels);
    workChannels.val(value => {
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "3.App connectWorker result : ",
          value
        );

      for (let key in value) {
        if (value.hasOwnProperty(key)) {
          //do something with value;
          if (DEBUG)
            LOG.log(
              "[" + CLIENT_HOST + "]",
              "4.App connectWorker result : ",
              key,
              value[key]
            );
          switch (key) {
            case "messageChannel":
              this.setState({ workerMessageID: value[key] });
              break;
            case "workQueue":
              this.setState({ workerQueueID: value[key] });
              break;
            case "workerChannelID":
              this.setState({ workerConnectionID: value[key] });
              break;
            case "lastAccess":
              this.setState({ lastAccess: value[key] });
              break;
            case "createDate":
              this.setState({ createDate: value[key] });
              break;
            case "fingerprint":
              workChannels.get("fingerprint").val(fingerprint => {
                if (DEBUG)
                  LOG.log(
                    "[" + CLIENT_HOST + "]",
                    "5.App connectWorker fingerprint : ",
                    fingerprint
                  );
                this.setState({ fingerprintCurrent: fingerprint });
              });
              break;
            default:
          }
          this.setState({ workerOnline: true });
        }
      }
    });
    return;
  };

  render() {
    return (
      <Route
        render={({ location }) => (
          <div>
            <NavigationDrawer
              drawerTitle={this.state.workerConnectionID}
              toolbarTitle={HOSTNAME}
              navItems={navItems.map(props => (
                <NavLink {...props} key={props.to} />
              ))}
            >
              <div>
                <p>connectionID : {this.state.workerConnectionID}</p>
                <p>queueID : {this.state.workerQueueID}</p>
                <p>messageChannelID : {this.state.workerMessageID}</p>
                <p>
                  fingerprintInitial : {this.state.fingerprintInitial.signature}
                </p>
                <p>
                  fingerprintCurrent : {this.state.fingerprintCurrent.signature}
                </p>
                <p>createDate : {this.state.createDate}</p>
                <p>lastAccess : {this.state.lastAccess}</p>
              </div>

              <Switch key={location.key}>
                <Route exact path="/" location={location} component={Home} />
                <Route path="/page-1" location={location} component={Page1} />
                <Route path="/page-2" location={location} component={Page2} />
                <Route path="/page-3" location={location} component={Page3} />
                <Route
                  path="/page-editor"
                  location={location}
                  component={PageEditor}
                />
                <Route
                  path="/page-developer"
                  location={location}
                  component={PageDeveloper}
                />
              </Switch>
            </NavigationDrawer>
          </div>
        )}
      />
    );
  }
}

export default App;
