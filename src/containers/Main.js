import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Router, Location, navigate } from '@reach/router';
import { css } from '@emotion/core';

import { Flex } from 'common/components/base';
import MainNavigator from 'components/MainNavigator';
import ProductList from './product/ProductsList';

const width = 960;
const navPath = R.path(['path']);
const navs = [{ name: 'ชาวประมง', path: '/' }, { name: 'แพ', path: '/docks' }];

/*
 * Style the Router: div[role='group'][tabindex] will select the router div
 * https://github.com/reach/router/issues/63#issuecomment-428050999
 */
const contentContainerStyle = css`
  width: ${width}px;
  padding: 40px 0;
  div[role='group'][tabindex] {
    flex: 1;
  }
`;

const Main = ({ title }) => {
  return (
    <Flex flexDirection="column" width="100%" height="100%" alignItems="center">
      <Location>
        {({ location }) => (
          <MainNavigator
            logoText={title}
            navs={navs}
            navigate={navigate}
            location={location}
            contentWidth={`${width}px`}
          />
        )}
      </Location>
      <Flex css={contentContainerStyle}>
        <ProductList />
        {/* <Router>
          <FishermanList path={navPath(navs[0])} title={title} />
        </Router> */}
      </Flex>
    </Flex>
  );
};

Main.propTypes = {
  title: PropTypes.string,
};

Main.defaultProps = {
  title: 'App',
};

export default Main;
