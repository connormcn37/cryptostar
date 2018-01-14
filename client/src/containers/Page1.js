import React, { Component } from "react";
import { Card, CardTitle, CardText } from "react-md";

import { DEBUG } from "../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.containers page1 initiated : ",
    new Date().toISOString()
  );

export default class Page1 extends Component {
  render() {
    return (
      <div className="md-grid md-text-container">
        <h2 className="md-cell md-cell--12">Page 1</h2>
        <Card className="md-cell">
          <CardTitle title="Card 1" />
          <CardText>
            <p>Wowza</p>
          </CardText>
        </Card>
        <Card className="md-cell">
          <CardTitle title="Card 2" />
          <CardText>
            <p>Wowza</p>
          </CardText>
        </Card>
        <Card className="md-cell">
          <CardTitle title="Card 3" />
          <CardText>
            <p>Wowza</p>
          </CardText>
        </Card>
      </div>
    );
  }
}
