import React, { Component } from "react";

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";

import Viewport from "../components/Viewport";
import ControlPanel from "../components/ControlPanel";

import "./home.css";
import LOGO from "./logo.svg";

import { DEBUG } from "../configs/localconfigs";
import { LOG, CLIENT_HOST } from "../api/logremote";

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.containers home initiated : ",
    new Date().toISOString()
  );

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      //      accountKey: "",
      logo: LOGO,
      width: 600,
      height: 600
    };
  }
  componentDidMount() {
    if (DEBUG) LOG.log("[" + CLIENT_HOST + "]", "1.Home props : ", this.props);
    //    const { getCookie } = Cookies;
    //    const accountKey = getCookie("accountkey");
    //    this.setState({ accountKey: accountKey });
  }

  render() {
    return (
      <div>
        <ControlPanel
          unsavedChanges={this.props.ui.unsavedChanges}
          createImage={this.props.actions.createImage}
          clearViewport={this.props.actions.clearViewport}
        />
        <img src={this.state.logo} className="home-logo" alt="logo" />
        <Viewport
          width={this.state.width}
          height={this.state.height}
          images={this.props.viewport.images}
          moveImage={this.props.actions.moveImage}
        />
      </div>
    );
  }
}
Home.propTypes = {
  viewport: PropTypes.object,
  actions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    viewport: state.viewport,
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
