import React, { useState } from 'react';
import { Flex, Button, TextField } from 'common/components/base';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Table } from 'common/components/table';
import { useLazyQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';

import { GET_ITEMS_NAME } from 'data/graphql/query';

const searchButtonStyle = css`
  margin-left: 3em;
  height: 3em;
  background-color: #3abbc9;
`;

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

const QSearchProduct = ({ user }) => {
  const [inputText, setInputText] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [queryResult, setQueryResult] = useState([]);
  const [disableSearch, setDisableSerach] = useState(false);

  const [getProducts, { loading, error, data }] = useLazyQuery(GET_ITEMS_NAME, {
    onCompleted: () => {
      setQueryResult(data.getItemsName.items);
      setFilterData(data.getItemsName.items);
      setDisableSerach(false);
    },
  });
  const filterProduct = () => {
    const r = [];
    if (queryResult.length > 0 && inputText !== '') {
      queryResult.map(prod => {
        if (prod.name.indexOf(inputText) >= 0) r.push(prod);
      });
    }
    setFilterData(r);
    setDisableSerach(false);
  };

  const inputOnChange = e => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  const handleClick = () => {
    setDisableSerach(true);
    console.log(user.meta.username);
    if (inputText === '') {
      if (queryResult.length === 0) {
        getProducts({
          variables: { username: user.meta.username, count: 5 },
        });
      } else {
        setFilterData(queryResult);
        setDisableSerach(false);
      }
    } else if (queryResult.length > 0) {
      filterProduct();
    } else {
      getProducts({
        variables: { username: user.meta.username, count: 5 },
      });
      filterProduct();
    }
  };
  return (
    <Flex flexDirection="column" width="100%" paddingY="1em">
      <Flex flexDirection="row">
        <TextField
          label="product"
          id="standard-basic"
          placeholder="insert product name"
          onChange={e => inputOnChange(e)}
          width={6 / 8}
        />
        <Button
          variant="contained"
          css={searchButtonStyle}
          width={2 / 8}
          disabled={disableSearch}
          onClick={handleClick}
        >
          search
        </Button>
      </Flex>
      <Flex marginTop="1em">
        <Table columns={columns} data={filterData} />
      </Flex>
    </Flex>
  );
};

QSearchProduct.propTypes = {
  callback: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(QSearchProduct);
