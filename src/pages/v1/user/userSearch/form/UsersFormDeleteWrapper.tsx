import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import UsersFormDelete from '@/pages/user/userSearch/form/UsersFormDelete';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  userDeleteById: (userId: string) => void;
  closeSidepanel: () => void;
  sidepanel: ISidepanel;
}

const UsersFormDeleteWrapper = (props: IProps) => {
  const userId: string = get(props, 'sidepanel.data.userId', '');
  const userName: string = get(props, 'sidepanel.data.userName', '');

  const onFinish = () => {
    props.userDeleteById(userId);
  };

  const onCancel = () => {
    props.closeSidepanel();
  };

  return <UsersFormDelete onFinish={onFinish} submitButtonText="Delete" onCancel={onCancel} userName={userName} />;
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
});

const mapDispatchToProps = (dispatch: any) => ({
  userDeleteById: (payload: string) => dispatch({ type: 'UsersDashboard/userDeleteById', payload }),
  closeSidepanel: () => dispatch({ type: 'Sidepanel/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersFormDeleteWrapper);
