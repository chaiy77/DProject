import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import * as R from 'ramda';

import { Flex, Box, Text } from 'common/components/base';
// import Table from 'common/components/table';
import { LIST_PRODUCTS } from 'data/graphql/query';

const headerTitle = 'ชาวประมง';

const dataTofishermanListItems = R.path(['listFisherman', 'items']);

const tableHeaderStyle = css`
  text-align: left;
`;

const textCenterAlign = css`
  text-align: center;
`;

const ModifiedDateCell = ({ cell }) => (
  <div
    css={css`
      ${textCenterAlign}
    `}
  >
    {moment(cell.value).format('D MMM YYYY')}
  </div>
);
ModifiedDateCell.propTypes = {
  cell: PropTypes.oneOfType([PropTypes.object]),
};
ModifiedDateCell.defaultProps = {
  cell: { value: '' },
};

const columns = [
  {
    id: 'fullName',
    Header: () => <div css={tableHeaderStyle}>ชื่อ</div>,
    accessor: row => `${row.firstName} ${row.lastName}`,
  },
  {
    id: 'area',
    Header: () => <div css={tableHeaderStyle}>ชุมชน</div>,
    accessor: 'area',
  },
  {
    id: 'dock',
    Header: () => <div css={tableHeaderStyle}>แพ</div>,
    accessor: 'dock',
  },
  {
    id: 'lastMonthIncome',
    Header: () => (
      <div
        css={css`
          ${tableHeaderStyle};
          ${textCenterAlign};
        `}
      >
        รายรับเดือนล่าสุด
      </div>
    ),
    accessor: 'lastMonthIncome',
  },
  {
    id: 'modifiedDate',
    Header: () => (
      <div
        css={css`
          ${tableHeaderStyle};
          ${textCenterAlign};
        `}
      >
        วันที่ปรับข้อมูล
      </div>
    ),
    accessor: 'modifiedDate',
    Cell: ModifiedDateCell,
  },
];

const FishermanList = () => {
  const { loading, error, data } = useQuery(LIST_PRODUCTS, {
    variables: { id: 'product_id001', sk: '&product#0' },
  });
  if (loading) {
    // console.log("GET PRODUCT LOADNIG");
    return <div>loading...</div>;
  }

  if (error) {
    // console.log("GET PRODUCT ERROR");
    const msg = `Error ${error.message}`;
    return <Flex>{msg}</Flex>;
  }
  // console.log("======== Product list ========");
  // console.log(data);
  // console.log("======================");
  return (
    <Flex width={1} flexDirection="column">
      <Box>
        <Text fontSize={4} fontWeight="bold">
          {headerTitle}
        </Text>
      </Box>
      <Box
        css={css`
          background-color: white;
          padding: 14px 0;
          border-radius: 6px;
          margin: 28px 0;
        `}
      >
        <div>Completed</div>
        {/* <Table columns={columns} data={dataTofishermanListItems(data)} /> */}
      </Box>
    </Flex>
  );
};

export default FishermanList;
