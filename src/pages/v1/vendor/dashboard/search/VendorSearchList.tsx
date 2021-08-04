import React from 'react';
import { get } from 'lodash';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IVendor } from '@/pages/v1/vendor/types';
import ActionMenu from '@/pages/v1/vendor/dashboard/search/ActionMenu';

interface IProps extends RouteComponentProps {
  items: IVendor[];
}

const VendorSearchList = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);

  const columns: ColumnProps<IVendor>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (row) => <Link to={`/vendor/${row._id}`}>{row.name}</Link>,
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

export default withRouter(VendorSearchList);
