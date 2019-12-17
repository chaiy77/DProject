import React from 'react';
import { css } from '@emotion/core';
import { Flex } from 'common/components/base';

const width = 100;

const Sell = props => {
  const { children } = props;

  const contentContainerStyle = css`
    padding: 1em;
    background: lightblue;
  `;
  return (
    <Flex width={1} css={contentContainerStyle}>
      {children}
    </Flex>
  );
};

export default Sell;
