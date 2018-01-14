import React, { Component } from "react";
import { DEBUG } from "../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.containers page2 initiated : ",
    new Date().toISOString()
  );

export default class Page2 extends Component {
  render() {
    return (
      <div className="md-grid">
        <h2 className="md-cell md-cell--12 md-text-container">Page 2</h2>
        <p className="md-cell md-cell--12 md-text-container">
          Here is some text for the second page. It is quite beautiful.
        </p>
      </div>
    );
  }
}
