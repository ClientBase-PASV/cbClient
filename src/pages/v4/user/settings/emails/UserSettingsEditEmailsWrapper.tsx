import React from 'react';
import UserSettingsEditEmailsForm from './UserSettingsEditEmailsForm';

const UserSettingsEditEmailsWrapper = () => {
  const onFinish = () => {
    console.log('onFinish');
  };

  return <UserSettingsEditEmailsForm onFinish={onFinish} />;
};

export default UserSettingsEditEmailsWrapper;
