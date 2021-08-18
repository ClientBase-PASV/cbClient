import { IVendor, IVendorQueryParams } from '../../types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IVendorDeleteById {
  vendorId: string;
  queryParams: IVendorQueryParams;
}

interface IProps {
  row: IVendor;
  open: (arg: ISidepanel) => void;
  deleteById: (arg: IVendorDeleteById) => void;
  queryParams: IVendorQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IVendor) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IVendor) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (vendorId: string) => {
    props.open({
      title: 'Edit Vendor',
      component: 'v3VendorFormEdit',
      place: 'VendorDashboard',
      width: 800,
      vendorId,
    });
  };

  const deletePrompt = (vendor: IVendor) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${vendor.name}`,
      okType: 'danger',
      onOk: () => props.deleteById({ vendorId: vendor._id, queryParams }),
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
  deleteById: (payload: IVendorDeleteById) => dispatch({ type: 'v3Vendor/deleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
