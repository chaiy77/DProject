import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Router, Location, navigate } from '@reach/router';
import { css } from '@emotion/core';

import { Flex, Box } from 'common/components/base';
import MainNavigator from 'components/MainNavigator';
import SideNavigator from 'components/SideNavigator';
import ProductList from './product/ProductsList';

const width = 100;
const navPath = R.path(['path']);
const topNavs = [
  { name: 'ซื้อ', path: '/' }, 
  { name: 'ขาย', path: '/sell' }, 
  { name: 'รายงาน', path: '/reports' }, 
  { name: 'ตั้งค่า', path: '/setting' }

];

/*
 * Style the Router: div[role='group'][tabindex] will select the router div
 * https://github.com/reach/router/issues/63#issuecomment-428050999
 */
const contentContainerStyle = css`
  width: ${width}%;
  padding: 1em 0;
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
      <Flex flexDirection="row" width="100%" height="100%" backgroundColor="gray" paddingY="1em">
        <Box width={1/6} height="100%" minHeight="640px">
          <Location>
            {({ location }) => (
              <SideNavigator
                navs={topNavs}
                navigate={navigate}
                location={location}
              />
            )}
          </Location>
        </Box>
        <Box flexDirection="column" width={5/6} height="100%" alignItems="center" padding="1em">
          <ProductList />
          {/* <Router>
            <FishermanList path={navPath(navs[0])} title={title} />
          </Router> */}
        </Box>
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
