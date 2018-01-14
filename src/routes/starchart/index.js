/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Starchart from './starchart';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{news{title,link,content}}',
    }),
  });
  // const { data } = await resp.json();
  // if (!data || !data.news) throw new Error('Failed to load the news feed.');
  const version = '123456789';
  const backgroundImg = 'images/purple-galaxy.jpg';
  const starImage = 'images/star-1.jpg';

  return {
    chunks: ['Starchart'],
    title: 'cryptStar',
    component: (
      <Layout>
        <Starchart
          version={version}
          backgroundImg={backgroundImg}
          starImage={starImage}
        />
      </Layout>
    ),
  };
}

export default action;
