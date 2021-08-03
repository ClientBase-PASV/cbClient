import { IBase, IBaseQueryParams } from '../../types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IBaseDeleteById {
  baseId: string;
  queryParams: IBaseQueryParams;
}

interface IProps {
  row: IBase;
  open: (arg: ISidepanel) => void;
  baseDeleteById: (arg: IBaseDeleteById) => void;
  queryParams: IBaseQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IBase) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IBase) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (baseId: string) => {
    props.open({
      title: 'Edit Base',
      component: 'BaseFormEdit',
      place: 'BaseDashboard',
      width: 800,
      baseId,
    });
  };

  const deletePrompt = (base: IBase) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${base.name}`,
      okType: 'danger',
      onOk: () => props.baseDeleteById({ baseId: base._id, queryParams }),
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
  baseDeleteById: (payload: IBaseDeleteById) => dispatch({ type: 'BaseDashboard/baseDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
