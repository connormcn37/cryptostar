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
import { Parallax } from 'react-scroll-parallax';
// import styled from 'styled-components';

import { RaisedButton } from 'material-ui';

import FontIcon from 'material-ui/FontIcon';
import {
  InteractiveForceGraph,
  ForceGraph,
  ForceGraphNode,
  ForceGraphLink,
} from 'react-vis-force';
import './starchart.css';
import { account } from './utils/blockchain';

class Home extends React.Component {
  static propTypes = {
    version: PropTypes.string.isRequired,
    backgroundImg: PropTypes.string.isRequired,
    starImage: PropTypes.string.isRequired,
  };
  componentWillMount = () => {};
  handleLoad = () => {
    // updates cached values after image dimensions have loaded
    this.context.parallaxController.update();
  };
  clickStar = () => {
    console.log('1.Home clickStar!');
  };
  render() {
    const styles = {
      backgroundImage: `url(${this.props.backgroundImg})`,
      /* Set rules to fill background */
      minheight: '100%',
      minwidth: '100%',

      /* Set up proportionate scaling */
      width: '100%',
      height: '90%',

      /* Set up positioning */
      position: 'fixed',
      bottom: 0,
      left: 0,
      zindex: 999,
    };
    return (
      <div style={styles} className="admin-dashboard">
        <Parallax
          className="custom-class"
          offsetYMax={10}
          offsetYMin={-10}
          slowerScrollRate
          tag="figure"
        >
          <InteractiveForceGraph
            simulationOptions={{ height: 300, width: 300 }}
            labelAttr="label"
            onSelectNode={node => console.log(node)}
            highlightDependencies
          >
            <ForceGraphNode
              node={{ id: 'first-occupied-node', label: 'occupied' }}
              fill="gray"
            />
            <ForceGraphNode
              node={{ id: 'second-occupied-node', label: 'occupied' }}
              fill="gray"
            />
            <ForceGraphNode
              node={{ id: 'third-occupied-node', label: 'occupied' }}
              fill="gray"
            />
            <ForceGraphNode
              node={{ id: 'fourth-occupied-node', label: 'occupied' }}
              fill="gray"
            />
            <ForceGraphNode
              node={{ id: 'first-frozen-node', label: 'frozen' }}
              fill="blue"
            />
            <ForceGraphNode
              node={{ id: 'first-unclaimed-node', label: 'unclaimed' }}
              fill="blue"
            />
            <ForceGraphNode
              node={{ id: 'second-unclaimed-node', label: 'unclaimed' }}
              fill="green"
            />
            <ForceGraphNode
              node={{ id: 'third-unclaimed-node', label: 'unclaimed' }}
              fill="green"
            />
            <ForceGraphLink
              link={{
                source: 'first-occupied-node',
                target: 'second-occupied-node',
              }}
              strokeWidth="1"
            />
          </InteractiveForceGraph>
        </Parallax>
      </div>
    );
  }
}
// //////
export default withStyles()(Home);
