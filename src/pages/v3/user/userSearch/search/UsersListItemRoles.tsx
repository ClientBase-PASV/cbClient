import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';

interface IProps {
  userRoles: string[];
  usersRolesList: string[];
  userId: string;
  onChange: (values: { roles: string[]; userId: string }) => void;
}

const UsersListItemRoles = (props: IProps) => {
  const { userRoles, usersRolesList, userId, onChange } = props;
  const [visible, setVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(userRoles);

  function handleSelection(selectedKeys: string[]) {
    onChange({ roles: selectedKeys, userId: userId });
    setSelectedKeys(selectedKeys);
  }

  function handleDeSelection(selectedKeys: string[]) {
    onChange({ roles: selectedKeys, userId: userId });
    setSelectedKeys(selectedKeys);
  }

  const handleClick = () => {
    setVisible(!visible);
  };

  const menu = (
    <Menu
      selectable
      defaultSelectedKeys={userRoles}
      multiple={true}
      selectedKeys={selectedKeys}
      onSelect={({ selectedKeys }) => handleSelection(selectedKeys)}
      onDeselect={({ selectedKeys }) => handleDeSelection(selectedKeys)}
    >
      {usersRolesList.map((el) => (
        <Menu.Item key={el}>{el}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown trigger={['click']} overlay={() => menu} visible={visible}>
      <div onClick={() => handleClick()}>
        {selectedKeys.length === 0 && <span>No roles</span>}
        {selectedKeys.map((el) => (
          <span key={el}>{el} </span>
        ))}
      </div>
    </Dropdown>
  );
};

export default UsersListItemRoles;
