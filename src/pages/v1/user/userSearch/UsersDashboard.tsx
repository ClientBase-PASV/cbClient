import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import UsersStats from '@/pages/user/userSearch/stats/UsersStats';
import UsersList from '@/pages/user/userSearch/search/UsersList';
import UsersPagination from '@/pages/user/userSearch/search/UsersPagination';
import UsersFilterForm from '@/pages/user/userSearch/search/UsersFilterForm';
import { IUsersSearchTerms, IUser, IUsersStats, IPagination } from '@/pages/user/userSearch/types';

const defaultSearchParams: IUsersSearchTerms = {
  name: '',
  email: '',
  phone: '',
  role: '',
  limit: 10,
  page: 1,
};

interface IProps {
  usersStats: IUsersStats;
  usersList: IUser[];
  usersRolesList: string[];
  usersPagination: IPagination;
  usersSearch: (arg: IUsersSearchTerms) => void;
  usersGetStats: () => void;
  usersGetRolesList: () => void;
}

const UsersDashboard = (props: IProps) => {
  const {
    usersStats = {},
    usersList = [],
    usersRolesList = [],
    usersSearch,
    usersGetStats,
    usersGetRolesList,
    usersPagination = {
      pageCurrent: 1,
      pageCount: 1,
      limit: 50,
      itemsCount: 50,
      isFirst: true,
      isLast: false,
    },
  } = props;

  const [searchForm, setSearchForm] = useState(defaultSearchParams);

  const search = (params: IUsersSearchTerms) => {
    usersSearch(params);
  };

  useEffect(() => {
    search(defaultSearchParams);
    usersGetStats();
    usersGetRolesList();
  }, []);

  const onFiltersChange = (values: IUsersSearchTerms) => {
    setSearchForm(values);
    search(values);
  };

  const onPageChange = (page: number) => {
    search({
      ...searchForm,
      page,
    });
  };

  return (
    <div>
      <h1>Users</h1>

      <UsersStats usersStats={usersStats} />

      <UsersFilterForm filters={searchForm} onChange={onFiltersChange} selectOptions={{ usersRolesList }} />

      <UsersList items={usersList} />

      {usersPagination.itemsCount > usersPagination.limit && (
        <UsersPagination pagination={usersPagination} onChange={onPageChange} />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  usersStats: state.UsersDashboard.usersStats,
  usersList: state.UsersDashboard.usersList,
  usersRolesList: state.UsersDashboard.usersRolesList,
  usersPagination: state.UsersDashboard.usersPagination,
});

const mapDispatchToProps = (dispatch: any) => ({
  usersSearch: (payload: IUsersSearchTerms) => dispatch({ type: 'UsersDashboard/usersSearch', payload }),
  usersGetStats: () => dispatch({ type: 'UsersDashboard/usersGetStats' }),
  usersGetRolesList: () => dispatch({ type: 'UsersDashboard/usersGetRolesList' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersDashboard);
