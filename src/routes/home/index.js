/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{news{title,link,content}}',
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.news) throw new Error('Failed to load the news feed.');
  const version = '123456789';
  const backgroundImg1 = 'images/starfield-1.jpg';
  const backgroundImg2 = 'images/starfield-2.jpg';
  const backgroundImg3 = 'images/starfield-3.jpg';
  return {
    chunks: ['home'],
    title: 'cryptStar',
    component: (
      <Layout>
        <Home
          version={version}
          backgroundImg1={backgroundImg1}
          backgroundImg2={backgroundImg2}
          backgroundImg3={backgroundImg3}
        />
      </Layout>
    ),
  };
}

export default action;
