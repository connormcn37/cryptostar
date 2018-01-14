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
import s from './Page.css';

class Page extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  };
  // static styles = {
  //   backgroundImage: 'images/starfield-1.jpg',
  //   /* Set rules to fill background */
  //   minheight: '100%',
  //   minwidth: '1024px',

  //   /* Set up proportionate scaling */
  //   width: 'auto',
  //   height: '100%',

  //   /* Set up positioning */
  //   position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   zindex: -1,
  // };
  render() {
    const { title, html } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <div
            // style={this.styles}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Page);
