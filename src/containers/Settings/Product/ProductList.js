import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, Flex, Button } from 'common/components/base';
import { css } from '@emotion/core';
import Table from 'common/components/table';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS_NAME, GET_LAMBDA } from 'data/graphql/query';

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

const ProductList = ({ setActiveTabIndex, createNewTab }) => {
  const [queryResult, setQueryResult] = useState([]);
  const [getProducts] = useLazyQuery(GET_PRODUCTS_NAME, {
    onCompleted: data => {
      setQueryResult(data.getProductsName.products);
      console.log(data.getProductsName.products);
    },
  });

  const [getLambda] = useLazyQuery(GET_LAMBDA, {
    onCompleted: data => {
      console.log('========== get lambda =========');
      console.log(data.getLambda.products);
    },
  });

  useEffect(() => {
    getLambda({ variables: { id: 'product_id001' } });
    getProducts({
      variables: { sk: '#product#&name', count: 5 },
    });
  }, []);

  const filterProduct = () => {
    const r = [];
    if (queryResult.length > 0 && inputText !== '') {
      queryResult.map(prod => {
        if (prod.name.indexOf(inputText) >= 0) r.push(prod);
      });
    }
    setFilterData(r);
  };
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
        <Table columns={columns} data={queryResult} />
      </Flex>
      <Flex width={1}>
        <Button onClick={() => setTabIndex(1)}> New Product </Button>
        <Button onClick={() => newTab('test')}> Detail of Product </Button>
      </Flex>
    </Flex>
  );
};

ProductList.propTypes = {
  setActiveTabIndex: PropTypes.func,
  createNewTab: PropTypes.func,
};

ProductList.defaultProps = {
  setActiveTabIndex: () => {},
  createNewTab: () => {},
};

export default ProductList;
