import React from 'react';
import UsersListItem from '@/pages/v1/user/userSearch/search/UsersListItem';
import { IUser } from '@/pages/v1/user/userSearch/types';

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
