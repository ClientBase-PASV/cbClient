import React from 'react';
import { get } from 'lodash';
import UserDiaryListItem from '@/pages/user/profile/UserDiaryListItem';

const UserDiaryList = (props: any) => {
  const items = get(props, 'items', []);

  return (
    <div>
      {items.map((el: any) => (
        <UserDiaryListItem key={el._id} item={el} />
      ))}
    </div>
  );
};

export default UserDiaryList;
