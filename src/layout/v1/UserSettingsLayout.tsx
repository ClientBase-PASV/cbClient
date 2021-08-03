import React from 'react';
import SettingsMenu from '@/pages/v1/user/settings/SettingsMenu';

const UserSettingsLayout = ({ children }: any) => {
  return (
    <div className="row mt-3">
      <div className="col-md-3">
        <SettingsMenu />
      </div>

      <div className="col-md-9">{children}</div>
    </div>
  );
};

export default UserSettingsLayout;
