import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@emotion/core';
import { Flex, Drawer, Button } from 'common/components/base';
// import CustomerSearch from 'components/Customers/QSearchCustomer';

const width = 100;

/*
 * Style the Router: div[role='group'][tabindex] will select the router div
 * https://github.com/reach/router/issues/63#issuecomment-428050999
 */

const AuxilaryPanelStyle = css``;

const DrawerStyle = css`
  width: 200px;
  flex-shrink: 0;
  & .MuiDrawer-paper {
    width: 200px;
    position: unset;
  }
`;

const Sell = props => {
  const { title, children } = props;
  const [auxOpen, setAuxOpen] = useState(false);

  const contentContainerStyle = css`
    padding: 1em;
    width: 100%;
    background: lightblue;
  `;

  const handleAuxOpen = () => {
    setAuxOpen(!auxOpen);
  };

  return <Flex css={contentContainerStyle}>{children}</Flex>;
};

Sell.propTypes = {
  title: PropTypes.string,
};

Sell.defaultProps = {
  title: 'App',
};

export default Sell;
