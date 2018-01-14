import React, { Component } from "react";
import { Card, CardTitle, CardText } from "react-md";
//import cookies from "js-cookie";
//import uuid from "uuid";
import Cookie from "../api/cookies";
import { DEBUG } from "../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.containers PageDeveloper initiated : ",
    new Date().toISOString()
  );

export default class PageDeveloper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: "",
      key: "",
      keyOptions: {
        id: 2,
        accesskey: "AAAA",
        pin: "P1P1P1"
      },
      lastState: "",
      account: "usertokenID",
      phonenumber: "14155988551",
      usertokenID: "1234"
    };
  }

  componentWillMount() {
    if (DEBUG)
      LOG.log("[" + CLIENT_HOST + "]", "1.pages index props : ", this.props);
    this.onboarding();
  }

  onboarding = async () => {
    if (DEBUG) LOG.log("[" + CLIENT_HOST + "]", "1.onboarding");
    const { getCookie } = Cookie;
    try {
      const STORAGE_KEY = "persistence";
      const cookie = await getCookie(STORAGE_KEY);
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "5.pages index onboarding cookie : ",
          cookie
        );
      if (cookie && cookie.usertokenID)
        this.setState({ usertokenID: cookie.usertokenID });
      if (cookie && cookie.key) this.setState({ key: cookie.key });
      if (cookie && cookie.phonenumber)
        this.setState({ phonenumber: cookie.phonenumber });
      if (cookie && cookie.state) this.setState({ lastState: cookie.state });
    } catch (err) {
      if (DEBUG)
        LOG.log(
          "[" + CLIENT_HOST + "]",
          "6.pages index onboarding error : ",
          err
        );
    }
  };

  render() {
    return (
      <div className="md-grid md-text-container">
        <h2 className="md-cell md-cell--12">Developer</h2>
        <Card className="md-cell">
          <CardTitle title="Cookie" />
          <CardText>
            <p>{this.state.cookie}</p>
          </CardText>
        </Card>
        <Card className="md-cell">
          <CardTitle title="User ID" />
          <CardText>
            <p>usertokenID = {this.state.usertokenID}</p>
          </CardText>
        </Card>
        <Card className="md-cell">
          <CardTitle title="Key" />
          <CardText>
            <p>Page Key = {this.state.key}</p>
          </CardText>
        </Card>
      </div>
    );
  }
}
