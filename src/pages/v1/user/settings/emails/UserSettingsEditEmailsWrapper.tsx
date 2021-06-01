import React from 'react';
import UserSettingsEditEmailsForm from '@/pages/user/settings/emails/UserSettingsEditEmailsForm';

const UserSettingsEditEmailsWrapper = () => {
  const onFinish = () => {
    console.log('onFinish');
  };

  return <UserSettingsEditEmailsForm onFinish={onFinish} />;
};

export default UserSettingsEditEmailsWrapper;
