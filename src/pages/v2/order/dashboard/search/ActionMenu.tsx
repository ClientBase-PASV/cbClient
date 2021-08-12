import { IOrder, IOrderQueryParams } from '@/pages/v2/order/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IOrderDeleteById {
  orderId: string;
  queryParams: IOrderQueryParams;
}

interface IProps {
  row: IOrder;
  open: (arg: ISidepanel) => void;
  deleteById: (arg: IOrderDeleteById) => void;
  queryParams: IOrderQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IOrder) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IOrder) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (orderId: string) => {
    props.open({
      title: 'Edit Order',
      component: 'v2OrderFormEdit',
      place: 'OrderDashboard',
      width: 800,
      orderId,
    });
  };

  const deletePrompt = (order: IOrder) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${order.name}`,
      okType: 'danger',
      onOk: () => props.deleteById({ orderId: order._id, queryParams }),
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
  deleteById: (payload: IOrderDeleteById) => dispatch({ type: 'v2Order/deleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
