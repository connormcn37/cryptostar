import React from "react";
import PropTypes from "prop-types";
import Image from "./Image";

import { DEBUG } from "../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.components viewport initiated : ",
    new Date().toISOString()
  );

class Viewport extends React.Component {
  constructor() {
    super();
    this.state = { size: 0 };
  }
  renderImages() {
    return this.props.images.map(img => {
      if (DEBUG)
        LOG.log("[" + CLIENT_HOST + "]", "1.viewport renderImages : ", img);
      return (
        <Image
          key={`image-${img.id}`}
          id={img.id}
          x={img.x}
          y={img.y}
          width={img.width}
          height={img.height}
          color={img.color}
          viewportWidth={this.props.width}
          viewportHeight={this.props.height}
          moveImage={this.props.moveImage}
        />
      );
    });
  }

  render() {
    if (DEBUG)
      LOG.log(
        "[" + CLIENT_HOST + "]",
        "1.viewport render props : ",
        this.props
      );
    const images = this.renderImages();
    const styles = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`
    };
    return (
      <div className="viewport" style={styles}>
        {images}
      </div>
    );
  }
}

Viewport.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  images: PropTypes.array,
  moveImage: PropTypes.func
};

export default Viewport;
