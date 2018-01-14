/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

const Welcome = visible =>
  visible ? (
    <div className={s.banner}>
      <h1 className={s.bannerTitle}>Parsec Discovered</h1>
      <p className={s.bannerDesc}>Own your Star. Join the Crypto-Verse!</p>
    </div>
  ) : (
    ''
  );

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandTxt: 'cryptoStar',
      showWelcome: true,
    };
  }
  showOnce = () => {
    this.setState({ showWelcome: !this.state.showWelcome });
    return Welcome;
  };
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation />
          <Link className={s.brand} to="/">
            <img
              src={logoUrl}
              srcSet={`${logoUrl2x} 2x`}
              width="38"
              height="38"
              alt="cryptoStar"
            />
            <span className={s.brandTxt}>{this.state.brandTxt}</span>
          </Link>
        </div>
        {Welcome(this.state.showWelcome)}
      </div>
    );
  }
}

export default withStyles(s)(Header);
