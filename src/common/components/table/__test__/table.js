import React from 'react';
import moment from 'moment';

import tus from 'test-utils';

import Table from '../Table';

const { render, within } = tus;

const columns = [
  {
    id: 'fullName',
    Header: 'ชื่อ',
    accessor: row => `${row.firstName} ${row.lastName}`,
  },
  {
    id: 'area',
    Header: 'ชุมชน',
    accessor: 'area',
  },
  {
    id: 'dock',
    Header: 'แพ',
    accessor: 'dock',
  },
  {
    id: 'lastMonthIncome',
    Header: 'รายรับเดือนล่าสุด',
    accessor: 'lastMonthIncome',
  },
  {
    id: 'modifiedDate',
    Header: 'วันที่ปรับข้อมูล',
    accessor: 'modifiedDate',
    Cell: ({ cell }) => moment(cell.value).format('D MMM YYYY'),
  },
];

test('render 1 item data', () => {
  const modifiedDate = '2019-12-29T09:25:00';
  const data = [
    {
      firstName: 'Adam',
      lastName: 'Smith',
      area: 'Alaska',
      dock: 'Ama',
      lastMonthIncome: 32560,
      modifiedDate,
    },
  ];

  const { getByText } = render(<Table columns={columns} data={data} />);
  const row = getByText(/adam smith/i).closest('tr');
  expect(row).not.toBeNull();

  const utils = within(row);
  expect(utils.getByText(/adam smith/i)).toBeInTheDocument();
  expect(utils.getByText(/alaska/i)).toBeInTheDocument();
  expect(utils.getByText(/ama/i)).toBeInTheDocument();
  expect(utils.getByText(/32560/i)).toBeInTheDocument();
  expect(
    utils.getByText(moment(modifiedDate).format('D MMM YYYY'))
  ).toBeInTheDocument();
  expect(utils.queryByText(/john doe/i)).toBeNull();
});

test('render with more than 1 item data', () => {
  const data = [
    { firstName: 'Adam', lastName: 'Smith', area: 'Alaska', dock: 'Ama' },
    { firstName: 'John', lastName: 'Doe', area: 'Hawaii', dock: 'Mark' },
  ];

  const { getByText } = render(<Table columns={columns} data={data} />);
  const firstRow = getByText(/adam smith/i).closest('tr');
  expect(firstRow).not.toBeNull();

  const firstRowUtils = within(firstRow);
  expect(firstRowUtils.getByText(/adam smith/i)).toBeInTheDocument();
  expect(firstRowUtils.queryByText(/john doe/i)).toBeNull();

  const secondRow = getByText(/john doe/i).closest('tr');
  const secondRowUtils = within(secondRow);
  expect(secondRowUtils.getByText(/hawaii/i)).toBeInTheDocument();
});
