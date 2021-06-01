import React from 'react';
import { connect } from 'umi';
import UserSettingsEditSecurityForm from '@/pages/user/settings/security/UserSettingsEditSecurityForm';
import { IUpdatePasswordForm } from '@/pages/user/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  updateUserPasswordById: (arg: IUpdatePasswordForm) => void;
  loadingEffects: ILoadingEffects;
}

const UserSettingsEditSecurityWrapper = (props: IProps) => {
  const onFinish = (formValues: IUpdatePasswordForm) => {
    props.updateUserPasswordById(formValues);
  };

  return <UserSettingsEditSecurityForm onFinish={onFinish} />;
};

const mapDispatchToProps = (dispatch: any) => ({
  updateUserPasswordById: (payload: IUpdatePasswordForm) => {
    dispatch({ type: 'Settings/updatePassword', payload });
  },
});

export default connect(null, mapDispatchToProps)(UserSettingsEditSecurityWrapper);
