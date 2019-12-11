import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTable, useRowSelect } from 'react-table';
import { css } from '@emotion/core';
import * as R from 'ramda';

const defaultTableStyle = css`
  width: 100%;
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;

    thead {
      border-bottom: 1px solid black;

      th,
      td {
        margin: 0;
        padding: 12px;
      }

      th {
        font-weight: bold;
        color: #444b5a;
      }
    }
    tbody {
      border-bottom: 1px solid black;
      td {
        padding: 12px;
      }
      tr {
        border-bottom: 1px solid #d8d8d8;
        cursor: copy;
      }
    }
  }
`;

const rowStyle = ({ active = false }) => css`
  ${active &&
    css`
      color: white;
      background-color: #00afec;
    `}
`;

const Table = ({ columns, data, tableStyle }) => {
  const [rowSelectIndex, setRowSelectIndex] = useState(-1);

  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const isRowSelect = i => {
    console.log('in isRowSelect');
    console.log(i);
    console.log(rowSelectIndex);
    console.log(R.equals(rowSelectIndex)(i));
    return R.equals(rowSelectIndex)(i);
  };

  const click = row => {
    console.log(row);
    console.log(row.index);
    console.log(row.values);
    setRowSelectIndex(row.index);
  };

  /* exception use 3rd party libray props */
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div css={tableStyle}>
      <table {...getTableProps()} css={css``}>
        <thead>
          <tr>
            {headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => click(row)}
                css={rowStyle({
                  active: isRowSelect(row.index),
                })}
              >
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  /* eslint-enable */
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  tableStyle: PropTypes.oneOfType([PropTypes.object]),
};

Table.defaultProps = {
  data: [],
  columns: [],
  tableStyle: defaultTableStyle,
};

export default Table;
