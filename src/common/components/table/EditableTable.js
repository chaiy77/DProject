import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import { css } from '@emotion/core';
import * as R from 'ramda';
import { Input } from 'common/components/form';

// https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/editable-data

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
        input {
          font-size: 1rem;
          padding: 0;
          margin: 0;
          border: 0;
        }
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

// Create an editable cell renderer
const EditableCell = ({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  updateTableData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred/leaved
  const onBlur = () => {
    updateTableData(index, id, value);
  };

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <Input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

const EditableTable = ({
  columns,
  data,
  tableStyle,
  resetSelectedRow,
  updateTableData,
  getCellProps,
}) => {
  const [rowSelectIndex, setRowSelectIndex] = useState(-1);

  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow,
  } = useTable({ columns, data, defaultColumn, updateTableData });

  useEffect(() => {
    setRowSelectIndex(-1); // reset selected row when only didMounte
  }, [data]); // call setRowSelectIndex again when [data] changed !!! Hook

  const isRowSelect = i => {
    return R.equals(rowSelectIndex)(i);
  };

  const click = row => {
    setRowSelectIndex(row.index);
  };

  /* exception use 3rd party libray props */
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div css={tableStyle}>
      <table {...getTableProps()} css={css``}>
        <thead>
          <tr>
            <th> No. </th>
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
                <td> {row.index + 1} </td>
                {/* https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/data-driven-classes-and-styles */}
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps([
                        {
                          className: cell.column.className,
                          style: cell.column.style,
                        },
                        getCellProps(cell),
                      ])}
                    >
                      {cell.render('Cell')}
                    </td>
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

EditableTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  tableStyle: PropTypes.oneOfType([PropTypes.object]),
  resetSelectedRow: PropTypes.bool,
  updateTableData: PropTypes.func,
  getCellProps: PropTypes.func,
};

EditableTable.defaultProps = {
  data: [],
  columns: [],
  resetSelectedRow: true,
  tableStyle: defaultTableStyle,
  updatrTableData: () => {},
  getCellProps: () => {},
};

export default EditableTable;
