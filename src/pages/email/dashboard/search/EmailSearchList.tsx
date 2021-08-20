import React, { useState } from 'react';
import { get } from 'lodash';
import { Drawer, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IEmail } from '@/pages/email/types';

interface IProps extends RouteComponentProps {
  items: IEmail[];
  onRead: (mailId: string) => void;
}

const EmailSearchList = (props: IProps) => {
  const items = get(props, 'items', []);

  const [drawer, setDrawer] = useState({ subject: '', message: ''});

  const onCloseDrawer = () => {
    setDrawer({ subject: '', message: ''});
  };

  const onRowClick = (row: IEmail) => {
    setDrawer(row);
    console.log(row)
    props.onRead(row._id)
  };

  const columns: ColumnProps<IEmail>[] = [
    {
      title: 'createdAt',
      key: 'createdAt',
      width: 250,
      render: (row) => (
        <span>
          {new Date(row.createdAt).toLocaleDateString('en-gb', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </span>
      ),
    },

    {
      title: 'Subject',
      key: 'subject',
      render: (row) => (row.isRead ? <span>{row.subject}</span> : <strong>{row.subject}</strong>),
    },
  ];

  return (
    <>
      <Table
        rowKey="_id"
        onRow={(record) => {
          return {
            onClick: () => onRowClick(record),
          };
        }}
        columns={columns}
        dataSource={items}
        size="small"
        className="table-middle"
        pagination={false}
      />

      <Drawer
        title={drawer.subject}
        placement="right"
        closable={false}
        onClose={onCloseDrawer}
        visible={Boolean(drawer.subject)}
        width="1100"
      >
        <pre>{drawer.message}</pre>
      </Drawer>
    </>
  );
};

export default withRouter(EmailSearchList);
