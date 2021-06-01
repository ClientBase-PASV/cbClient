import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import UserFormSendMessage from '@/pages/user/userSearch/form/UserFormSendMessage';

interface IProps {
  userDeleteById: (userId: string) => void;
  closeSidepanel: () => void;
  sidepanel: ISidepanel;
}

const UserFormSendMessageWrapper = (props: IProps) => {
  const userId: string = get(props, 'sidepanel.data.userId', '');
  const userName: string = get(props, 'sidepanel.data.userName', '');

  const onFinish = (values: any) => {
    console.log(values); // props.sendMessage(userId,sms text);
  };

  const onCancel = () => {
    props.closeSidepanel();
  };

  return (
    <>
      <UserFormSendMessage
        onFinish={onFinish}
        submitButtonText="Send"
        onCancel={onCancel}
        userName={userName}
        userId={userId}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
});

const mapDispatchToProps = (dispatch: any) => ({
  userDeleteById: (payload: string) => dispatch({ type: 'UsersDashboard/userDeleteById', payload }),
  closeSidepanel: () => dispatch({ type: 'Sidepanel/close' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserFormSendMessageWrapper);
