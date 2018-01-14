import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardTitle } from "react-md";

import { DEBUG } from "../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.components controlpanel initiated : ",
    new Date().toISOString()
  );

class ControlPanel extends React.Component {
  constructor() {
    super();
    this.handleCreateImage = this.handleCreateImage.bind(this);
    this.handleClearViewport = this.handleClearViewport.bind(this);
  }

  handleCreateImage() {
    this.props.createImage({
      x: 0,
      y: 0,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    });
  }

  handleClearViewport() {
    this.props.clearViewport();
  }

  render() {
    const unsavedChanges = this.props.unsavedChanges ? (
      <CardTitle title="Using CardTitle" subtitle="With CardText">
        Unsaved Changes
      </CardTitle>
    ) : null;
    return (
      <div className="control-panel">
        <Card>
          <Button flat primary onClick={this.handleCreateImage}>
            Create
          </Button>
          <Button flat secondary onClick={this.handleClearViewport}>
            Clear
          </Button>
        </Card>
        {unsavedChanges}
      </div>
    );
  }
}

ControlPanel.propTypes = {
  clearViewport: PropTypes.func,
  createImage: PropTypes.func,
  unsavedChanges: PropTypes.bool
};

export default ControlPanel;
