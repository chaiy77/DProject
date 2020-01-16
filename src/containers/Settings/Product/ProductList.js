import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Text, Flex, Button } from 'common/components/base';
import { css } from '@emotion/core';
import { Table } from 'common/components/table';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_ITEMS_NAME } from 'data/graphql/query';

const tableHeaderStyle = css`
  text-align: left;
`;

const textCenterAlign = css`
  text-align: center;
`;

const columns = [
  {
    id: 'ID',
    Header: () => <div css={tableHeaderStyle}>ID</div>,
    accessor: row => `${row.id}`,
  },
  {
    id: 'Name',
    Header: () => <div css={tableHeaderStyle}>Name</div>,
    accessor: row => `${row.name}`,
  },
];

const ProductList = ({ setActiveTabIndex, createNewTab, user, tabData }) => {
  const setTabIndex = i => {
    console.log('setTabIndex', i);
    setActiveTabIndex(i);
  };

  const newTab = t => {
    createNewTab(t);
  };

  return (
    <Flex
      width={1}
      backgroundColor="gray"
      paddingY="1em"
      flexDirection="column"
    >
      <Flex width={1}>
        <Text> Products List </Text>
      </Flex>
      <Flex width={1} marginTop="1em">
        <Table columns={columns} data={tabData} />
      </Flex>
      <Flex width={1}>
        <Button onClick={() => setTabIndex(1)}> New Product </Button>
        <Button onClick={() => newTab('test')}> Detail of Product </Button>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

ProductList.propTypes = {
  setActiveTabIndex: PropTypes.func,
  createNewTab: PropTypes.func,
  tabData: PropTypes.array,
};

ProductList.defaultProps = {
  setActiveTabIndex: () => {},
  createNewTab: () => {},
  tabData: [],
};

export default connect(
  mapStateToProps,
  null
)(ProductList);
