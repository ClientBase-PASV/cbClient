import React from 'react';
import { Badge } from 'antd';
import { get } from 'lodash';

export default function UserRoles(props: any) {
  const roles = get(props, 'roles', []);
  return (
    <span>
      {roles.map((el: string) => (
        <Badge count={el} style={{ backgroundColor: '#800080' }} key={el} />
      ))}
    </span>
  );
}
