/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Parallax from 'react-springy-parallax';
import Web3 from 'web3';
import { RaisedButton } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import {
  InteractiveForceGraph,
  ForceGraph,
  ForceGraphNode,
  ForceGraphLink,
} from 'react-vis-force';
import s from './starchart.css';

class Home extends React.Component {
  static propTypes = {
    version: PropTypes.string.isRequired,
    backgroundImg: PropTypes.string.isRequired,
    starImage: PropTypes.string.isRequired,
  };
  clickStar = () => {
    console.log('1.Home clickStar!');
  };
  render() {
    const styles = {
      display: 'flex',
      backgroundImage: `url(${this.props.backgroundImg})`,
      fontFamily: 'Menlo-Regular, Menlo, monospace',
      fontSize: 14,
      resizeMode: 'cover',
      color: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <MuiThemeProvider>
        <Parallax ref="parallax" pages={1}>
          <Parallax.Layer offset={0} speed={0.5} style={styles}>
            <img
              alt="starbase 1"
              width="30px"
              height="30px"
              border-radius="50%"
              src={this.props.starImage}
              onClick={this.clickStar}
            />
            <InteractiveForceGraph
              simulationOptions={{ height: 300, width: 300 }}
              labelAttr="label"
              onSelectNode={node => console.log(node)}
              highlightDependencies
            >
              <ForceGraphNode
                node={{ id: 'first-node', label: 'First node' }}
                fill="red"
              />
              <ForceGraphNode
                node={{ id: 'second-node', label: 'Second node' }}
                fill="blue"
              />
              <ForceGraphLink
                link={{ source: 'first-node', target: 'second-node' }}
              />
            </InteractiveForceGraph>
          </Parallax.Layer>
        </Parallax>
      </MuiThemeProvider>
    );
  }
}
// //////
export default withStyles(s)(Home);
