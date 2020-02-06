import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { Text, Flex, Button } from 'common/components/base';
import { css } from '@emotion/core';
import { Table } from 'common/components/table';

const tableHeaderStyle = css`
  text-align: left;
`;

// const textCenterAlign = css`
//   text-align: center;
// `;

const columns = [
  {
    id: 'itemID',
    Header: () => <div css={tableHeaderStyle}>ID</div>,
    accessor: row => `${row.customerID}`,
  },
  {
    id: 'Name',
    Header: () => <div css={tableHeaderStyle}>Name</div>,
    accessor: row => `${row.name}`,
  },
  {
    id: 'Group',
    Header: () => <div css={tableHeaderStyle}>Group</div>,
    accessor: row => `${row.group}`,
  },
  {
    id: 'Address',
    Header: () => <div css={tableHeaderStyle}>Address</div>,
    accessor: row => `${row.address}`,
  },
  {
    id: 'District',
    Header: () => <div css={tableHeaderStyle}>District</div>,
    accessor: row => `${row.district}`,
  },
  {
    id: 'Province',
    Header: () => <div css={tableHeaderStyle}>Province</div>,
    accessor: row => `${row.province}`,
  },
  {
    id: 'createdDate',
    Header: () => <div css={tableHeaderStyle}>Created Date</div>,
    accessor: row => {
      return moment(row.createdDate)
        .local()
        .format('DD-MM-YYYY');
    },
  },
  {
    id: 'updateddDate',
    Header: () => <div css={tableHeaderStyle}>Updated Date</div>,
    accessor: row => {
      return moment(row.createdDate)
        .local()
        .format('DD-MM-YYYY');
    },
  },
];

const CustomerList = ({ setActiveTabIndex, createNewTab, tabData }) => {
  const setTabIndex = i => {
    // console.log('setTabIndex', i);
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
        <Text> Customer List </Text>
      </Flex>
      <Flex width={1} marginTop="1em">
        <Table columns={columns} data={tabData} initSortBy="itemID" />
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

CustomerList.propTypes = {
  setActiveTabIndex: PropTypes.func,
  createNewTab: PropTypes.func,
  tabData: PropTypes.array,
};

CustomerList.defaultProps = {
  setActiveTabIndex: () => {},
  createNewTab: () => {},
  tabData: [],
};

export default connect(
  mapStateToProps,
  null
)(CustomerList);
