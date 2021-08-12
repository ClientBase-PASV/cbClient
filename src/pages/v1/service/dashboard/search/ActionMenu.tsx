import { IService, IServiceQueryParams } from '@/pages/v1/service/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IServiceDeleteById {
  serviceId: string;
  queryParams: IServiceQueryParams;
}

interface IProps {
  row: IService;
  open: (arg: ISidepanel) => void;
  deleteById: (arg: IServiceDeleteById) => void;
  queryParams: IServiceQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IService) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IService) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (serviceId: string) => {
    props.open({
      title: 'Edit Service',
      component: 'ServiceFormEdit',
      place: 'ServiceDashboard',
      width: 800,
      serviceId,
    });
  };

  const deletePrompt = (service: IService) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${service.name}`,
      okType: 'danger',
      onOk: () => props.deleteById({ serviceId: service._id, queryParams }),
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
  deleteById: (payload: IServiceDeleteById) => dispatch({ type: 'v1Service/deleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
