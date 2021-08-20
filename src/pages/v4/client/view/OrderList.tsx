import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IOrder } from '@/pages/v4/order/types';
import ActionMenu from '@/pages/v4/order/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IOrder[];
}

const OrderList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IOrder>[] = [
    {
      title: 'Service',
      key: 'service',
      render: (row) => <Link to={`/v4/service/${row.service._id}`}>{row.service.name}</Link>,
    },
    {
      title: 'cPrice',
      dataIndex: 'clientPrice',
      key: 'clientPrice',
    },
    {
      title: 'cPaid',
      dataIndex: 'clientPaid',
      key: 'clientPaid',
    },
    {
      title: 'cDebt',
      dataIndex: 'clientDebt',
      key: 'clientDebt',
    },
    {
      title: 'vPrice',
      dataIndex: 'vendorPrice',
      key: 'vendorPrice',
    },
    {
      title: 'vPaid',
      dataIndex: 'vendorPaid',
      key: 'vendorPaid',
    },
    {
      title: 'vDebt',
      dataIndex: 'vendorDebt',
      key: 'vendorDebt',
    },
    {
      title: 'pActual',
      dataIndex: 'profitActual',
      key: 'profitActual',
    },
    {
      title: 'pPotential',
      dataIndex: 'profitPotential',
      key: 'profitPotential',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'Action',
      key: 'action',
      className: 'actions',
      width: 100,
      render: (row) => <ActionMenu row={row} queryParams={queryParams} />,
    },
  ];

  return (
    <Table rowKey="_id" columns={columns} dataSource={items} size="small" className="table-middle" pagination={false} />
  );
};

export default withRouter(OrderList);
