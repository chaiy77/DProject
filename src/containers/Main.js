import React from 'react';
import PropTypes from 'prop-types';
// import * as R from 'ramda';
import { Router, Location, navigate } from '@reach/router';
import { css } from '@emotion/core';

import { Flex, Box } from 'common/components/base';
import MainNavigator from 'components/MainNavigator';
import Setting from './Setting';
import Sell from './Sell';
import Buy from './Buy';
import Reports from './Reports';

import Invoice from './Sell/Invoice';
import SellSetting from './Sell/SellSetting';

const width = 100;
// const navPath = R.path(['path']);

const topNavs = [
  { name: 'buy', path: '/', link: '/' },
  { name: 'sell', path: '/sell', link: '/sell' },
  { name: 'รายงาน', path: '/reports', link: '/reports' },
  { name: 'ตั้งค่า', path: '/setting', link: 'setting' },
];

const subNavs = [
  {
    menu: 'sell',
    subMenu: [
      { name: 'ใบส่งสินค้า/ขายสินค้า', path: '/sell/invoice' },
      { name: 'ใบเสนอราคา', path: '/sell/quotation' },
      { name: 'ใบสำคัญรับเงิน', path: '/sell/receipt' },
      { name: 'ตั้งค่า', path: '/sell/setting' },
    ],
  },
  {
    menu: 'buy',
    subMenu: [
      { name: 'ใบรับสินค้า/ซื้อสินค้า', path: '/buy/bol' },
      { name: 'ใบสำคัญจ่ายเงิน', path: '/buy/payment' },
      { name: 'ตั้งค่า', path: '/buy/setting' },
    ],
  },
];

/*
 * Style the Router: div[role='group'][tabindex] will select the router div
 * https://github.com/reach/router/issues/63#issuecomment-428050999
 */
const contentContainerStyle = css`
  width: ${width}%;
  padding: 1em;
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
            subNavs={subNavs}
            navigate={navigate}
            location={location}
            contentWidth={`${width}%`}
          />
        )}
      </Location>
      <Box
        flexDirection="column"
        width={1}
        alignItems="center"
        padding="1em"
        css={contentContainerStyle}
      >
        {/* <ProductList /> */}

        {/* ignore reach-router scroll to navigated position */}
        {/* https://github.com/reach/router/issues/242 */}
        <Router primary={false}>
          <Buy path="buy" />
          <Sell path="sell">
            <Invoice path="invoice" />
            <SellSetting path="setting" />
          </Sell>
          <Reports path="reports" />
          <Setting path="setting" />
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
