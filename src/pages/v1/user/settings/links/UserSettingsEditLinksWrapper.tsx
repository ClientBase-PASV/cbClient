import React from 'react';
import UserSettingsEditLinksForm from '@/pages/v1/user/settings/links/UserSettingsEditLinksForm';

const UserSettingsEditLinksWrapper = () => {
  const onFinish = (formValues: any) => {
    console.log('onFinish', formValues);
  };

  return <UserSettingsEditLinksForm onFinish={onFinish} />;
};

export default UserSettingsEditLinksWrapper;
