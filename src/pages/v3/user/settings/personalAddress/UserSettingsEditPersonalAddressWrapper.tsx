import React from 'react';
import UserSettingsEditPersonalAddressForm from '@/pages/v3/user/settings/personalAddress/UserSettingsEditPersonalAddressForm';

const UserSettingsCreateCompanyAccountWrapper = () => {
  const onFinish = () => {
    console.log('onFinish');
  };

  return <UserSettingsEditPersonalAddressForm onFinish={onFinish} />;
};

export default UserSettingsCreateCompanyAccountWrapper;
