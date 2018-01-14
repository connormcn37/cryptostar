import React, { Component } from "react";
import { LOG, CLIENT_HOST } from "../api/logremote";

// The editor core
import Editor, { Editable, createEmptyState } from "ory-editor-core";
import "ory-editor-core/lib/index.css"; // we also want to load the stylesheets

// Require our ui components (optional). You can implement and use your own ui too!
import { Trash, DisplayModeToggle, Toolbar } from "ory-editor-ui";
import "ory-editor-ui/lib/index.css";

// Load some exemplary plugins:
import slate from "ory-editor-plugins-slate"; // The rich text area plugin
import "ory-editor-plugins-slate/lib/index.css"; // Stylesheets for the rich text area plugin
import parallax from "ory-editor-plugins-parallax-background"; // A plugin for parallax background images
import "ory-editor-plugins-parallax-background/lib/index.css"; // Stylesheets for parallax background images
import { DEBUG } from "../configs/localconfigs";
import LOGO from "./logo.svg";
require("react-tap-event-plugin")(); // react-tap-event-plugin is required by material-ui which is used by ory-editor-ui so we need to call it here

// Define which plugins we want to use. We only have slate and parallax available, so load those.
const plugins = {
  content: [slate()], // Define plugins for content cells
  layout: [parallax({ defaultPlugin: slate() })] // Define plugins for layout cells
};

// Creates an empty editable
const content = createEmptyState();
if (DEBUG) LOG.log("[" + CLIENT_HOST + "]", "1.PageEditor content : ", content);

// Instantiate the editors
const editor = new Editor({
  plugins,
  // pass the content state - you can add multiple editables here
  editables: [content]
});

if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.containers PageEditor initiated : ",
    new Date().toISOString()
  );

class App extends Component {
  constructor() {
    super();
    this.state = {
      logo: LOGO
    };
  }
  render() {
    return (
      <div>
        <div className="App-header">
          <img src={this.state.logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <Editable editor={editor} id={content.id} />

        <Trash editor={editor} />
        <DisplayModeToggle editor={editor} />
        <Toolbar editor={editor} />
      </div>
    );
  }
}

export default App;
