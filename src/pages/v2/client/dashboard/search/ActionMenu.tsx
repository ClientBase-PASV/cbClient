import { IClient, IClientQueryParams } from '@/pages/v2/client/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IClientDeleteById {
  clientId: string;
  queryParams: IClientQueryParams;
}

interface IProps {
  row: IClient;
  open: (arg: ISidepanel) => void;
  deleteById: (arg: IClientDeleteById) => void;
  queryParams: IClientQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IClient) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IClient) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (clientId: string) => {
    props.open({
      title: 'Edit Client',
      component: 'v2ClientFormEdit',
      place: 'ClientDashboard',
      width: 800,
      clientId,
    });
  };

  const deletePrompt = (client: IClient) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${client.name}`,
      okType: 'danger',
      onOk: () => props.deleteById({ clientId: client._id, queryParams }),
    });
  };

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex align-items-end">
        <Button type="link" onClick={() => editHandler(row._id)}>
          <EditOutlined className="edit-pen-icon" />
        </Button>

        <Dropdown overlay={menu(row)}>
          <span className="ant-dropdown-link">
            <img src={dotsIcon} alt="" height="27" />
          </span>
        </Dropdown>
      </div>
    </span>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  deleteById: (payload: IClientDeleteById) => dispatch({ type: 'v2Client/deleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
