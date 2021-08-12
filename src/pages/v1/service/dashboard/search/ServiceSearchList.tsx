import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IService } from '@/pages/v1/service/types';
import ActionMenu from '@/pages/v1/service/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IService[];
}

const ServiceSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IService>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/v1/service/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'Vendor',
      key: 'vendor',
      render: (row) => <Link to={`/v1/vendor/${row._id}`}>{row.name}</Link>,
    },
    {
      title: 'Vendor price',
      dataIndex: 'vendorPrice',
      key: 'vendorPrice',
    },
    {
      title: 'Client price',
      dataIndex: 'clientPrice',
      key: 'clientPrice',
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
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={items}
      size="small"
      className="table-middle"
      pagination={false}
    />
  );
};

export default withRouter(ServiceSearchList);
