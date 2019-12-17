import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import * as R from 'ramda';
import { Router, Location, navigate } from '@reach/router';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { Flex, Box } from 'common/components/base';
import MainNavigator from 'components/MainNavigator';
import QuickMenu from 'components/QuickMenu';

import Sell from './Sell';
import Reports from './Reports';

import Invoice from './Sell/Invoice';
import SellSetting from './Sell/SellSetting';

import Buy from './Buy';
import BillOfLoading from './Buy/BillOfLoading';
import Payment from './Buy/Payment';
import BuySetting from './Buy/BuySetting';

import Setting from './Setting';
import SettingProduct from './Settings/SettingProduct';
import SettingCustomer from './Settings/SettingCustomer';
import SettingSupplier from './Settings/SettingSupplier';

import { QCreateCustomer, QSearchCustomer, QSearchProduct } from './Quickmenus';

const width = 100;
// const navPath = R.path(['path']);

const topNavs = [
  { name: 'buy', path: '/', link: '/' },
  { name: 'sell', path: '/sell', link: '/sell' },
  { name: 'reports', path: '/reports', link: '/reports' },
  { name: 'setting', path: '/setting', link: '/setting' },
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
  {
    menu: 'setting',
    subMenu: [
      { name: 'ลูกค้า', path: '/setting/customer' },
      { name: 'ผู้ผลิตสินค้า', path: '/setting/supplier' },
      { name: 'สินค้า', path: '/setting/product' },
    ],
  },
];

/*
 * Style the Router: div[role='group'][tabindex] will select the router div
 * https://github.com/reach/router/issues/63#issuecomment-428050999
 */
const contentContainerStyle = css`
  padding: 1em;
  background: gray;
  div[role='group'][tabindex] {
    flex: 1;
  }
`;

const StyledRouter = styled(Router)`
  flex: 1;
`;

const Main = ({ title }) => {
  const [qValues, setQValues] = useState('');

  const callbackFromQuick = data => {
    console.log(data);
  };

  const quickMenus = [
    {
      name: 'Create Customer',
      component: <QCreateCustomer callback={callbackFromQuick} />,
      key: 'createCustomer',
    },
    {
      name: 'Search Customer',
      component: <QSearchCustomer callback={callbackFromQuick} />,
      key: 'searchCustomer',
    },
    {
      name: 'Search Product',
      component: <QSearchProduct callback={callbackFromQuick} />,
      key: 'searchProduct',
    },
  ];

  return (
    <Flex flexDirection="column" width="100%" height="100%" alignItems="center">
      <Flex width={1}>
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
      </Flex>
      <Flex
        flexDirection="row"
        width={1}
        padding="1em"
        css={contentContainerStyle}
      >
        {/* <ProductList /> */}
        <Flex width={2 / 8} padding="0 1em">
          <QuickMenu menuList={quickMenus} />
        </Flex>
        <Flex width={6 / 8} padding="1em" backgroundColor="white">
          {/* ignore reach-router scroll to navigated position */}
          {/* https://github.com/reach/router/issues/242 */}

          {/* Provide a way to disable rendering `div` for `Router`,
           this will problem with flex in children */}
          {/* https://github.com/reach/router/issues/63 */}
          <StyledRouter primary={false}>
            <Buy path="buy">
              <BillOfLoading path="bol" />
              <Payment path="payment" />
              <BuySetting path="setting" />
            </Buy>
            <Sell path="sell">
              <Invoice path="invoice" />
              <SellSetting path="setting" />
            </Sell>
            <Reports path="reports" />
            <Setting path="setting">
              <SettingCustomer path="customer" />
              <SettingSupplier path="supplier" />
              <SettingProduct path="product" />
            </Setting>
          </StyledRouter>
        </Flex>
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
