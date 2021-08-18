import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IClient } from '@/pages/v3/client/types';
import ActionMenu from '@/pages/v3/client/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IClient[];
}

const ClientSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IClient>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/v3/client/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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

export default withRouter(ClientSearchList);
