import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IOrder } from '@/pages/v2/order/types';
import ActionMenu from '@/pages/v2/order/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IOrder[];
}

const OrderSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IOrder>[] = [
    {
      title: 'Order',
      key: 'name',
      render: (row) => <Link to={`/v2/order/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'Client',
      key: 'client',
      render: (row) => <Link to={`/v2/client/${row.client_id}`}>{row.client.name}</Link>,
    },
    {
      title: 'clientPrice',
      dataIndex: 'clientPrice',
      key: 'clientPrice',
    },
    {
      title: 'clientPaid',
      dataIndex: 'clientPaid',
      key: 'clientPaid',
    },
    {
      title: 'clientDebt',
      dataIndex: 'clientDebt',
      key: 'clientDebt',
    },
    {
      title: 'vendorPrice',
      dataIndex: 'vendorPrice',
      key: 'vendorPrice',
    },
    {
      title: 'vendorPaid',
      dataIndex: 'vendorPaid',
      key: 'vendorPaid',
    },
    {
      title: 'vendorDebt',
      dataIndex: 'vendorDebt',
      key: 'vendorDebt',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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

export default withRouter(OrderSearchList);
