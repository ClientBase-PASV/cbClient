import React from 'react';
import UsersListItem from '@/pages/v3/user/userSearch/search/UsersListItem';
import { IUser } from '@/pages/v3/user/userSearch/types';

interface IProps {
  items: IUser[];
}

const UsersList = (props: IProps) => {
  return (
    <div>
      {props.items.map((el) => (
        <UsersListItem key={el._id} item={el} />
      ))}
    </div>
  );
};

export default UsersList;
