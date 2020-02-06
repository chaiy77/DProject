import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, Flex, Button } from 'common/components/base';
import { css } from '@emotion/core';
import { Table } from 'common/components/table';

//
import { PARTNERS } from 'data/mock/partners';

const tableHeaderStyle = css`
  text-align: left;
`;

// const textCenterAlign = css`
//   text-align: center;
// `;

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
    id: 'Tel',
    Header: () => <div css={tableHeaderStyle}>Tel No.</div>,
    accessor: row => `${row.tel}`,
  },
];

//  ////// DATA MOCKUP //////////
const customers = PARTNERS.filter(partner => partner.type === 'customer');
//  //////////////////////////////

const SupplierList = ({ setActiveTabIndex, createNewTab }) => {
  const [queryResult, setQueryResult] = useState([]);
  //   const [customers, setCustomer] = useState(initCustomers)

  //   const [getProducts] = useLazyQuery(GET_ITEMS_NAME, {
  //     onCompleted: data => {
  //       setQueryResult(data.getItemsName.items);
  //       console.log(data.getItemsName.items);
  //     },
  //   });

  useEffect(() => {
    setQueryResult(customers);
    //   getProducts({
    //     variables: { sk: '#product#&name', count: 5 },
    //   });
  }, [customers]);

  const setTabIndex = i => {
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
        <Text> Suppliers List </Text>
      </Flex>
      <Flex width={1} marginTop="1em">
        <Table columns={columns} data={queryResult} />
      </Flex>
      <Flex width={1}>
        <Button onClick={() => setTabIndex(1)}> New Supplier </Button>
        <Button onClick={() => newTab('test')}> Detail of Supplier</Button>
      </Flex>
    </Flex>
  );
};

SupplierList.propTypes = {
  setActiveTabIndex: PropTypes.func,
  createNewTab: PropTypes.func,
};

SupplierList.defaultProps = {
  setActiveTabIndex: () => {},
  createNewTab: () => {},
};

export default SupplierList;
