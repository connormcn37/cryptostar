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
import s from './Home.css';
import { RaisedButton } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';

class Home extends React.Component {
  static propTypes = {
    version: PropTypes.string.isRequired,
    backgroundImg1: PropTypes.string.isRequired,
    backgroundImg2: PropTypes.string.isRequired,
    backgroundImg3: PropTypes.string.isRequired,
  };
  clickStar = () => {
    console.log('1.Home clickStar!');
  };
  render() {
    const styles = {
      backgroundColor: '#87BCDE',
      backgroundImage: 'url(' + this.props.backgroundImg3 + ')',
      fontFamily: 'Menlo-Regular, Menlo, monospace',
      fontSize: 14,
      lineHeight: '10px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    const buttonStyle = {
      width: '15',
      height: '15',
    };
    return (
      <MuiThemeProvider>
        <Parallax ref="parallax" pages={1}>
          <Parallax.Layer offset={0} speed={1} style={styles}>
            <input
              type="image"
              alt="starbase 1"
              style={this.buttonStyle}
              src="/images/star-1.jpg"
              onClick={this.clickStar}
            />
          </Parallax.Layer>
        </Parallax>
      </MuiThemeProvider>
    );
  }
}
////////
export default withStyles(s)(Home);
