import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Router, Location, navigate } from '@reach/router';
import { css } from '@emotion/core';

import { Flex, Box } from 'common/components/base';
import MainNavigator from 'components/MainNavigator';
import Setting from './Setting';
import Sell from './Sell';
import Buy from './Buy';
import Reports from './Reports';

import Invoice from './Sell/Invoice';

const width = 100;
const navPath = R.path(['path']);
const topNavs = [
  { name: 'ซื้อ', path: '/', link: '/'}, 
  { name: 'ขาย', path: '/sell/*', link: '/sell' }, 
  { name: 'รายงาน', path: '/reports', link: '/reports' }, 
  { name: 'ตั้งค่า', path: '/setting', link: 'setting' }

];

/*
 * Style the Router: div[role='group'][tabindex] will select the router div
 * https://github.com/reach/router/issues/63#issuecomment-428050999
 */
const contentContainerStyle = css`
  width: ${width}%;
  padding: 0;
  background: gray;
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
            navs={topNavs}
            navigate={navigate}
            location={location}
            contentWidth={`${width}%`}
          />
        )}
      </Location>
      <Box flexDirection="column" width={1} height="100%" 
        alignItems="center" padding="1em" css={contentContainerStyle}
      >
        {/* <ProductList /> */}

        {/* ignore reach-router scroll to navigated position */}
        {/* https://github.com/reach/router/issues/242 */}
        <Router  primary={false}>
          <Buy path={navPath(topNavs[0])} />
          <Sell path={navPath(topNavs[1])} >
              <Invoice path="/invoice"/>
          </Sell>
          <Reports path={navPath(topNavs[2])} />
          <Setting path={navPath(topNavs[3])} />
        </Router>
      </Box>

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
